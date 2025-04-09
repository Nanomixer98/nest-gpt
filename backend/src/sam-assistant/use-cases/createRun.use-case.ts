import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (
  openai: OpenAI,
  { threadId, assistantId = 'asst_ZNNEeGZkDgPTzoMldhdL1CJg' }: Options,
) => {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
    // instructions: // This overrides the instructions provided in the thread.
  });
  // console.log({ run });

  return run;
};
