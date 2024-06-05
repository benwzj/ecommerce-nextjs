import padsJson from './coolerpads.json';

type CoolerPad = {
  make: string;
  model: string;
  size: string | string[];
  id: number;
};
let index = 1000;
const coolerPads: CoolerPad[] = padsJson.cooler_pads.map((pad) => ({ ...pad, id: index++ }));

export function getMakes(): string[] {
  const makeSet: Set<string> = new Set();
  for (const pad of coolerPads) {
    makeSet.add(pad.make);
  }
  return Array.from(makeSet);
}

export function getModels(make: string): string[] {
  const models = [];
  for (const pad of coolerPads) {
    if (pad.make === make) {
      models.push(pad.model);
    }
  }
  return models;
}

export function getSizes(make: string, model: string): string[] {
  const sizes = [];
  for (const pad of coolerPads) {
    if (pad.model === model && pad.make === make) {
      if (typeof pad.size === 'object') sizes.push(...pad.size);
      else sizes.push(pad.size);
      break;
    }
  }
  return sizes;
}
