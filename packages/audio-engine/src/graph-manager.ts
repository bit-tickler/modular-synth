import { createFaustNode } from './faust-node-factory';
import type { FaustDspNode, FaustNodeOptions } from './types';

export class AudioGraphManager {
  private audioCtx: AudioContext | null = null;
  private nodes = new Map<string, FaustDspNode>();

  async initAudioContext() {
    if (this.audioCtx) return;
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    await this.audioCtx.resume();
  }

  async addFaustNode(id: string, dspCode: string, options: FaustNodeOptions = {}) {
    await this.initAudioContext();
    const node = await createFaustNode(this.audioCtx!, dspCode, options);
    this.nodes.set(id, node);
    return node;
  }

  connect(sourceId: string, targetId: string) {
    const source = this.nodes.get(sourceId)?.faustNode;
    const target = this.nodes.get(targetId)?.faustNode;
    if (source && target) source.connect(target);
  }
}

export const graphManager = new AudioGraphManager();
