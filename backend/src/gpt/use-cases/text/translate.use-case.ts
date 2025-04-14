import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    temperature: 0.2,
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: `
        Si el idioma no existe, retorna un mensaje de error.
        Traduce el siguiente texto al idioma ${lang}:${prompt}.
        `,
      },
    ],
    response_format: {
      type: 'text',
    },
  });
};
