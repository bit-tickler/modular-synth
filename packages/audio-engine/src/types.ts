export interface FaustNodeOptions {
  name?: string;
  polyphony?: number;
}

export interface FaustDspNode {
  faustNode: any;
  setParamValue(path: string, value: number): void;
  getParamValue(path: string): number;
  getMetaData(): any;
}
