// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { OpenAI } from "openai";
import {
  MEAL_PLAN_ASSISTANT,
  MEAL_PLAN_FIRST_MESSAGE,
} from "@/constants/openai.constant";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function saveDietPlan(userId, dietData, mealsData) {
  // Create a new DietPlan
  const dietPlan = await prisma.dietPlan.create({
    data: {
      title: "Custom Diet Plan",
      description: "AI-generated diet plan",
      userId: userId,
    },
  });

  // Process each day's meals
  for (const dayMeal of mealsData) {
    const { day, meals } = dayMeal;

    // Process each meal within the day
    for (const meal of meals) {
      const { name, totalCalories, totalProtein, totalCarbs, totalFat, foods } =
        meal;

      // Create a new Meal
      await prisma.meal.create({
        data: {
          title: name,
          calories: totalCalories,
          dietPlanId: dietPlan.id,
          foods: foods.map((food) => ({
            name: food.name,
            quantity: food.quantity,
            unit: food.unit,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
          })),
        },
      });
    }
  }
}

// generate PUT request
export async function POST(request: NextRequest) {
  try {
    let firstRunMessage;
    let secondRunMessage;
    let mealsData = [];

    // FIRST RUN COMPLETION FUNCTION
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
    // SECOND RUN
    const secondRun = async (threadId: string, assistantId: string) => {
      const threadMessages = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: "send the rest 3 days. no additional text.",
        }
      );
      const secondRunCreated = await openai.beta.threads.runs.create(threadId, {
        assistant_id: MEAL_PLAN_ASSISTANT,
      });

      const secondRunCompleted = await waitForRunCompletion(
        threadId,
        secondRunCreated.id
      );
      if (secondRunCompleted) {
        const messages = await openai.beta.threads.messages.list(threadId);
        const lastMessage = messages.data[0];
        const response = lastMessage?.content[0]?.text.value;
        secondRunMessage = response;
        console.log(secondRunMessage);
        // mealsData.push(JSON.parse(secondRunMessage).meals);
      }
    };
    // CREATE THREAD
    const thread = await openai.beta.threads.create();
    // ATTACH MESSAGE
    const threadMessages = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: JSON.stringify(MEAL_PLAN_FIRST_MESSAGE),
      }
    );
    // RUN THREAD
    const runCreated = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: MEAL_PLAN_ASSISTANT,
    });
    // WAIT FOR  1ST RUN COMPLETION
    const runCompleted = await waitForRunCompletion(thread.id, runCreated.id);

    if (runCompleted) {
      console.log("1st Run completed successfully.");
      // Run completed successfully, execute the second function
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      const response = lastMessage?.content[0]?.text.value;
      firstRunMessage = response;
      console.log(firstRunMessage);
      // console.log(JSON.parse(firstRunMessage).meals);
      // mealsData.push(firstRunMessage.meals);
      const secondRunComplete = await secondRun(thread.id, MEAL_PLAN_ASSISTANT);
    } else {
      // An error occurred during the run
      console.error("Failed to complete the run.");
    }

    return NextResponse.json("mealsData", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
