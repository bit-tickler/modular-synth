import type { FaustCompiler, LibFaust } from '@grame/faustwasm';

let compilerInstance: FaustCompiler | null = null;

export async function initFaust(): Promise<void> {
  if (compilerInstance) return;

  const { instantiateFaustModuleFromFile, LibFaust, FaustCompiler } = await import('@grame/faustwasm');

  const module = await instantiateFaustModuleFromFile(
    new URL('@grame/faustwasm/libfaust-wasm/libfaust-wasm.js', import.meta.url).href
  );

  const libFaust = new LibFaust(module);
  compilerInstance = new FaustCompiler(libFaust);
}

export function getFaustCompiler(): FaustCompiler {
  if (!compilerInstance) throw new Error('Call initFaust() first');
  return compilerInstance;
}
