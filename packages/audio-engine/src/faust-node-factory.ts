import { initFaust, getFaustCompiler } from './faust-compiler';
import type { FaustDspNode, FaustNodeOptions } from './types';

export async function createFaustNode(
  audioCtx: AudioContext,
  dspCode: string,
  options: FaustNodeOptions = {}
): Promise<FaustDspNode> {
  await initFaust();

  const { FaustMonoDspGenerator, FaustAudioWorkletNode } = await import('@grame/faustwasm');

  const generator = new FaustMonoDspGenerator();
  const name = options.name || 'FaustDSP';

  await generator.compile(getFaustCompiler(), name, dspCode, '-I libraries/');

  // Faust types are incomplete — we cast the static create method
  const node = await (FaustAudioWorkletNode as any).create(audioCtx, name, generator);

  return {
    faustNode: node,
    setParamValue(path: string, value: number) {
      node.setParamValue(path, value);
    },
    getParamValue(path: string) {
      return node.getParamValue(path);
    },
    getMetaData() {
      return node.getMetaData?.() || {};
    },
  };
}
