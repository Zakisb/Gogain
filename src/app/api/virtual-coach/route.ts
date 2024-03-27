import { virtualCoachPrompt } from "@/constants/prompts.constant";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const parsedMessages = MessageArraySchema.parse(messages);

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
      return {
        role: message.isUserMessage ? "user" : "system",
        content: message.text,
      };
    });

    outboundMessages.unshift({
      role: "system",
      content: virtualCoachPrompt,
    });

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);

    return new Response(stream);
  } catch (error) {
    console.log(error);
    return new Response("error", { status: 500 });
  }
}
