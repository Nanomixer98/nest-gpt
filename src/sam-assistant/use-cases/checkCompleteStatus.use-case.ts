// Not used anymore
import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;
  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  // console.log({ runStatus: runStatus.status });

  if (runStatus.status === 'completed') {
    return runStatus;
  } else if (runStatus.status === 'failed') {
    throw new Error('Run failed');
  }

  // Wait a second before checking again
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(openai, options);
};
