import * as path from 'path';
import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice: string;
}
type VoiceKey =
  | 'nova'
  | 'alloy'
  | 'ash'
  | 'coral'
  | 'echo'
  | 'fable'
  | 'onyx'
  | 'sage'
  | 'shimmer';

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {
  const voices: Record<string, VoiceKey> = {
    nova: 'nova',
    alloy: 'alloy',
    ash: 'ash',
    coral: 'coral',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    sage: 'sage',
    shimmer: 'shimmer',
  };

  const selectedVoice = voices[voice] ?? voices.nova;

  const folderPath = path.resolve(__dirname, '../../../generated/audios');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};
