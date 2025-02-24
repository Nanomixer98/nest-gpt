import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.8,
    max_tokens: 750,
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      {
        role: 'assistant',
        content: prompt,
      },
    ],
    store: true,
    response_format: {
      type: 'text',
    },
  });

  return completion.choices[0].message;
};
