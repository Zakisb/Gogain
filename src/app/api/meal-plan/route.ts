// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { OpenAI } from "openai";
import JSON5 from "json5";
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
  const test = `{\n  "day": 4,\n  "meals": [\n    {\n      "name": "Petit-déjeuner",\n      "totalCalories": 450,\n      "totalProtein": 31,\n      "totalCarbs": 45,\n      "totalFat": 15,\n      "foods": [\n        {\n          "name": "Pain au levain",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 12.3,\n          "carbs": 97.2,\n          "fat": 0.8\n        },\n        {\n          "name": "Œufs",\n          "quantity": 2,\n          "unit": "unit",\n          "protein": 12.6,\n          "carbs": 1.1,\n          "fat": 9.9\n        }\n      ]\n    },\n    {\n      "name": "Déjeuner",\n      "totalCalories": 600,\n      "totalProtein": 40.1,\n      "totalCarbs": 75.8,\n      "totalFat": 9.5,\n      "foods": [\n        {\n          "name": "Colin d\'alaska",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 15.7,\n          "carbs": 0,\n          "fat": 0.7\n        },\n        {\n          "name": "Pain de seigle",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 6.5,\n          "carbs": 41,\n          "fat": 1.1\n        },\n        {\n          "name": "Huile d\'olive",\n          "quantity": 5,\n          "unit": "ml",\n          "protein": 0,\n          "carbs": 0,\n          "fat": 5\n        }\n      ]\n    },\n    {\n      "name": "Dîner",\n      "totalCalories": 450,\n      "totalProtein": 28,\n      "totalCarbs": 45,\n      "totalFat": 15,\n      "foods": [\n        {\n          "name": "Steak haché 5%",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 20,\n          "carbs": 0.2,\n          "fat": 5\n        },\n        {\n          "name": "Patate douce",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 1.6,\n          "carbs": 20.7,\n          "fat": 0.1\n        }\n      ]\n    }\n  ]\n},\n{\n  "day": 5,\n  "meals": [\n    {\n      "name": "Petit-déjeuner",\n      "totalCalories": 450,\n      "totalProtein": 30,\n      "totalCarbs": 45,\n      "totalFat": 20,\n      "foods": [\n        {\n          "name": "Riz complet",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 7.5,\n          "carbs": 72,\n          "fat": 3.3\n        },\n        {\n          "name": "Yaourt grecque 0%",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 10,\n          "carbs": 3,\n          "fat": 0\n        }\n      ]\n    },\n    {\n      "name": "Déjeuner",\n      "totalCalories": 600,\n      "totalProtein": 42.8,\n      "totalCarbs": 79.9,\n      "totalFat": 11.8,\n      "foods": [\n        {\n          "name": "Escalope de poulet",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 24.2,\n          "carbs": 0,\n          "fat": 1.6\n        },\n        {\n          "name": "Riz complet",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 7.5,\n          "carbs": 72,\n          "fat": 3.3\n        },\n        {\n          "name": "Huile d\'olive",\n          "quantity": 5,\n          "unit": "ml",\n          "protein": 0,\n          "carbs": 0,\n          "fat": 5\n        }\n      ]\n    },\n    {\n      "name": "Dîner",\n      "totalCalories": 450,\n      "totalProtein": 28.3,\n      "totalCarbs": 45,\n      "totalFat": 16.8,\n      "foods": [\n        {\n          "name": "Yaourt grecque 0%",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 10,\n          "carbs": 3,\n          "fat": 0\n        },\n        {\n          "name": "Noix",\n          "quantity": 30,\n          "unit": "g",\n          "protein": 4.1,\n          "carbs": 3.9,\n          "fat": 18\n        }\n      ]\n    }\n  ]\n},\n{\n  "day": 6,\n  "meals": [\n    {\n      "name": "Petit-déjeuner",\n      "totalCalories": 450,\n      "totalProtein": 31,\n      "totalCarbs": 45,\n      "totalFat": 20,\n      "foods": [\n        {\n          "name": "Pain au levain",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 12.3,\n          "carbs": 97.2,\n          "fat": 0.8\n        },\n        {\n          "name": "Œufs",\n          "quantity": 2,\n          "unit": "unit",\n          "protein": 12.6,\n          "carbs": 1.1,\n          "fat": 9.9\n        }\n      ]\n    },\n    {\n      "name": "Déjeuner",\n      "totalCalories": 600,\n      "totalProtein": 42.5,\n      "totalCarbs": 79.9,\n      "totalFat": 11.3,\n      "foods": [\n        {\n          "name": "Steak haché 5%",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 20,\n          "carbs": 0.2,\n          "fat": 5\n        },\n        {\n          "name": "Pain au levain",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 12.3,\n          "carbs": 97.2,\n          "fat": 0.8\n        },\n        {\n          "name": "Noix",\n          "quantity": 30,\n          "unit": "g",\n          "protein": 4.1,\n          "carbs": 3.9,\n          "fat": 18\n        }\n      ]\n    },\n    {\n      "name": "Dîner",\n      "totalCalories": 450,\n      "totalProtein": 32.5,\n      "totalCarbs": 47.9,\n      "totalFat": 13.3,\n      "foods": [\n        {\n          "name": "Colin d\'alaska",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 15.7,\n          "carbs": 0,\n          "fat": 0.7\n        },\n        {\n          "name": "Riz basmati",\n          "quantity": 100,\n          "unit": "g",\n          "protein": 8,\n          "carbs": 77,\n          "fat": 0.5\n        }\n      ]\n    }\n  ]\n}`;
  const jsonString = test.replace(/\\n/g, "");
  // Escape single quotes
  const jsonString2 = jsonString.replace(/'/g, "\\'");

  const jsonString3 = jsonString2.replace(/\\([^"\\\/bfnrt])/g, "$1");

  const closingBraceIndex = jsonString3.lastIndexOf("}");

  // Trim any trailing non-whitespace characters after the closing brace

  const jsonString5 = jsonString3.slice(0, closingBraceIndex + 1);
  return NextResponse.json({ first: JSON.parse(jsonString5) }, { status: 201 });
  // try {
  //   let firstRunMessage;
  //   let secondRunMessage;
  //   let mealsData = [];
  //   // FIRST RUN COMPLETION FUNCTION
  //   const waitForRunCompletion = async (
  //     threadId: string,
  //     runId: string,
  //     sleepInterval: number = 5000
  //   ): Promise<boolean> => {
  //     let cycleCount = 1;
  //     while (true) {
  //       try {
  //         const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  //         if (run.status === "completed") {
  //           return true;
  //         }
  //       } catch (error) {
  //         console.error(`An error occurred while retrieving the run: ${error}`);
  //         return false;
  //       }
  //       cycleCount++;
  //       console.log(`Waiting for run to complete... (Cycle ${cycleCount})`);
  //       await new Promise((resolve) => setTimeout(resolve, sleepInterval));
  //     }
  //   };
  //   // SECOND RUN
  //   const secondRun = async (threadId: string, assistantId: string) => {
  //     const threadMessages = await openai.beta.threads.messages.create(
  //       threadId,
  //       {
  //         role: "user",
  //         content: "send the rest 3 days. no additional text.",
  //       }
  //     );
  //     const secondRunCreated = await openai.beta.threads.runs.create(threadId, {
  //       assistant_id: MEAL_PLAN_ASSISTANT,
  //     });
  //     const secondRunCompleted = await waitForRunCompletion(
  //       threadId,
  //       secondRunCreated.id
  //     );
  //     if (secondRunCompleted) {
  //       const messages = await openai.beta.threads.messages.list(threadId);
  //       const lastMessage = messages.data[0];
  //       const response = lastMessage?.content[0]?.text.value;
  //       secondRunMessage = response;
  //       // console.log(secondRunMessage);
  //       // mealsData.push(JSON.parse(secondRunMessage).meals);
  //     }
  //   };
  //   // CREATE THREAD
  //   const thread = await openai.beta.threads.create();
  //   // ATTACH MESSAGE
  //   const threadMessages = await openai.beta.threads.messages.create(
  //     thread.id,
  //     {
  //       role: "user",
  //       content: JSON.stringify(MEAL_PLAN_FIRST_MESSAGE),
  //     }
  //   );
  //   // RUN THREAD
  //   const runCreated = await openai.beta.threads.runs.create(thread.id, {
  //     assistant_id: MEAL_PLAN_ASSISTANT,
  //   });
  //   // WAIT FOR  1ST RUN COMPLETION
  //   const runCompleted = await waitForRunCompletion(thread.id, runCreated.id);
  //   if (runCompleted) {
  //     console.log("1st Run completed successfully.");
  //     // Run completed successfully, execute the second function
  //     const messages = await openai.beta.threads.messages.list(thread.id);
  //     const lastMessage = messages.data[0];
  //     const response = lastMessage?.content[0]?.text.value;
  //     firstRunMessage = response;
  //     console.log(firstRunMessage);
  //     // console.log(JSON.parse(firstRunMessage).meals);
  //     // mealsData.push(firstRunMessage.meals);
  //     // const secondRunComplete = await secondRun(thread.id, MEAL_PLAN_ASSISTANT);
  //   } else {
  //     // An error occurred during the run
  //     console.error("Failed to complete the run.");
  //   }
  //   // Remove the leading and trailing double quotes
  //   const jsonString = firstRunMessage.slice(1, -1);
  //   // Replace single backslashes with double backslashes
  //   const escapedJsonString = jsonString.replace(/\\/g, "\\\\");
  //   // Remove newline characters
  //   const cleanedJsonString = escapedJsonString.replace(/\\n/g, "");
  //   // Parse the cleaned JSON string
  //   const jsonObject = JSON.parse(cleanedJsonString);
  //   return NextResponse.json({ first: jsonObject }, { status: 201 });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(error, { status: 500 });
  // }
}
