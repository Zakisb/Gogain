// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { OpenAI } from "openai";
import { MEAL_PLAN_ASSISTANT } from "@/constants/openai.constant";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// generate PUT request
export async function POST(request: NextRequest) {
  try {
    let firstRunMessage;
    let secondRunMessage;

    const waitForRunCompletion = async (
      threadId: string,
      runId: string,
      sleepInterval: number = 5000
    ): Promise<boolean> => {
      let cycleCount = 1;
      while (true) {
        try {
          const run = await openai.beta.threads.runs.retrieve(threadId, runId);
          if (run.status === "completed") {
            return true;
          }
        } catch (error) {
          console.error(`An error occurred while retrieving the run: ${error}`);
          return false;
        }
        cycleCount++;
        console.log(`Waiting for run to complete... (Cycle ${cycleCount})`);
        await new Promise((resolve) => setTimeout(resolve, sleepInterval));
      }
    };

    const secondRun = async (threadId: string, assistantId: string) => {
      const threadMessages = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content:
            "send the rest 4 days. no additional text.  JSON FORMATTED OBJECT.",
        }
      );
      const secondRunCreated = await openai.beta.threads.runs.create(threadId, {
        assistant_id: MEAL_PLAN_ASSISTANT,
      });

      const secondRunCompleted = await waitForRunCompletion(
        threadId,
        secondRunCreated.id
      );
      console.log(secondRunCompleted);
      if (secondRunCompleted) {
        const messages = await openai.beta.threads.messages.list(threadId);
        const lastMessage = messages.data[0];
        const response = lastMessage?.content[0]?.text.value;
        secondRunMessage = response;
        console.log(firstRunMessage, secondRunMessage);
      }
    };

    const thread = await openai.beta.threads.create();
    const message = {
      gender: "male",
      age: 35,
      dietaryRestrictions: ["no meat", "gluten-free"],
      numDailyMeals: 2,
      flavorPreference: "salty",
      dailyWaterIntake: 2000,
      beverageChoices: ["water", "green tea"],
      healthConditions: ["lactose intolerance"],
      supplements: ["vitamin D", "fish oil"],
      weightGoal: "lose",
      preferredCarbSources: [
        "brown rice",
        "quinoa",
        "sweet potatoes",
        "whole-grain bread",
      ],
      preferredProteinSources: ["tofu", "lentils", "chickpeas", "Greek yogurt"],
      preferredFatSources: ["avocado", "nuts", "olive oil", "seeds"],
      likesToCook: true,
    };
    const threadMessages = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: JSON.stringify(message),
      }
    );

    const runCreated = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: MEAL_PLAN_ASSISTANT,
    });

    const runCompleted = await waitForRunCompletion(thread.id, runCreated.id);

    if (runCompleted) {
      // Run completed successfully, execute the second function
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      const response = lastMessage?.content[0]?.text.value;
      firstRunMessage = response;
      const secondRunComplete = await secondRun(thread.id, MEAL_PLAN_ASSISTANT);
    } else {
      // An error occurred during the run
      console.error("Failed to complete the run.");
    }

    return NextResponse.json("nutritionData", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
