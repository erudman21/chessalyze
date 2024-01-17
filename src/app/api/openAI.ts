"use server";

import { cookies } from "next/headers";
import { openai } from "./openAiClient";
import { getCurrUserInfo } from "./actions";

export async function getOpenAIResponse(
  gameFen: string,
  userInput: string,
  sfEval: number | undefined
) {
  const assistant = await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID!
  );
  const { thread } = await getCurrUserInfo();

  if (!thread) {
    return;
  }

  await openai.beta.threads.messages.create(thread, {
    role: "user",
    content: `The chess engine stockfish gives this position: ${gameFen} an evaluation of ${sfEval}. My evaluation of the position is ${userInput}.`,
  });

  let run = await openai.beta.threads.runs.create(thread, {
    assistant_id: assistant.id,
  });

  while (run.status === "queued" || run.status === "in_progress") {
    run = await openai.beta.threads.runs.retrieve(thread, run.id);
  }

  const messages: any = await openai.beta.threads.messages.list(thread);

  return messages.body.data[0].content[0].text.value;
}
