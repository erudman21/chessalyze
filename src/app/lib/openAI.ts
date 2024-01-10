"use server";

import { cookies } from "next/headers";
import { openai } from "./openAiClient";

export async function getOpenAIResponse(
  gameFen: string,
  userInput: string,
  sfEval: number | undefined
) {
  const assistant = await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID!
  );
  const thread = cookies().get("thread");

  if (!thread) {
    return;
  }

  await openai.beta.threads.messages.create(thread.value, {
    role: "user",
    content: `The chess engine stockfish gives this position: ${gameFen} an evaluation of ${sfEval}. My evaluation of the position is ${userInput}.`,
  });

  let run = await openai.beta.threads.runs.create(thread.value, {
    assistant_id: assistant.id,
  });

  while (run.status === "queued" || run.status === "in_progress") {
    run = await openai.beta.threads.runs.retrieve(thread.value, run.id);
  }

  const messages: any = await openai.beta.threads.messages.list(thread.value);

  return messages.body.data[0].content[0].text.value;
}
