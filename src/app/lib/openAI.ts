"use server";

import { OpenAI } from "openai";
import { cookies } from "next/headers";

const ASSISTANT_ID = "asst_wnMcA7MCKin1eqReYnbX41YH";

export async function getOpenAIResponse(
  gameFen: string,
  userInput: string,
  sfEval: number | undefined
) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const assistant = await openai.beta.assistants.retrieve(ASSISTANT_ID);
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

  console.log(messages.body.data[0].content[0].text.value);
  return messages.body.data[0].content[0].text.value;
}
