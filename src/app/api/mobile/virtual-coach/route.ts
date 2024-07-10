import { mobileVirtualCoachPrompt } from "@/constants/prompts.constant";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/groq-stream";
import { MessageArraySchema } from "@/lib/validators";
import { StreamingTextResponse } from "ai";
import fs from "fs";
import Groq from "groq-sdk";
import { Readable } from "stream";
import { join } from "path";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY ?? "",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const messages = [];
    let index = 0;

    // Extract messages from FormData
    while (formData.has(`messages[${index}][type]`)) {
      const type = formData.get(`messages[${index}][type]`);
      const content = formData.get(`messages[${index}][content]`);
      const isUserMessage =
        formData.get(`messages[${index}][isUserMessage]`) === "true";
      messages.push({ type, content, isUserMessage });
      index++;
    }

    const processedMessages = [];
    for (const message of messages) {
      if (message.type === "voice") {
        const transcriptionText = await transcribeAudio(
          message.content,
          `voice-message-${message.id}.m4a`
        );

        processedMessages.push({
          role: message.isUserMessage ? "user" : "system",
          content: transcriptionText,
        });
      } else if (message.type === "text") {
        processedMessages.push({
          role: message.isUserMessage ? "user" : "system",
          content: message.content,
        });
      } else {
        return new Response("Invalid message format", { status: 400 });
      }
    }

    processedMessages.unshift({
      role: "system",
      content: mobileVirtualCoachPrompt,
    });

    const payload: OpenAIStreamPayload = {
      model: "llama3-70b-8192",
      messages: processedMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    // console.log(stream);
    return new Response(stream);
  } catch (error) {
    console.log(error);
    return new Response("error", { status: 500 });
  }
}

async function transcribeAudio(base64Data, fileName) {
  // Decode the base64 string to a Buffer
  const buffer = Buffer.from(base64Data, "base64");

  // Define the path to save the file
  const tempFilePath = join("/tmp", fileName);

  // Write the buffer to a file
  fs.writeFileSync(tempFilePath, buffer);

  // Create a readable stream from the file
  const stream = fs.createReadStream(tempFilePath);

  // Transcribe the audio file using the Groq SDK
  const transcription = await groq.audio.transcriptions.create({
    file: stream,
    model: "whisper-large-v3",
    prompt: "Specify context or spelling", // Optional
    response_format: "json", // Optional
    language: "fr", // Optional
    temperature: 0.0, // Optional
  });

  return transcription.text;
}
