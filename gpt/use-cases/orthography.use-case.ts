import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
        Las palabras usadas deben de existir en el diccionario de la RAE.
        Debes de responder en formato JSON, tu tarea es corregirlos y retornar
        información soluciones, también debes de dar un porcentaje de acierrot por
        el usuario.
        Si no hay errores, debes retornar un mensaje de felicidades.
        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ["error -> solución"]
          message: string, // Usa emojis para dar feedback
        }
        `,
      },
      {
        role: 'assistant',
        content: prompt,
      },
    ],
    store: true,
    response_format: {
      type: 'json_object',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonResponse = JSON.parse(completion.choices[0].message.content!);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return jsonResponse;
};
