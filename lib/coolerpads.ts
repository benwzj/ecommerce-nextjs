import padsJson from './coolerpads.json';

type CoolerPad = {
  make: string;
  model: string;
  size: string | string[];
  id: number;
};

export function getMakes(): string[] {
  const pads: CoolerPad[] = padsJson.cooler_pads;
  const makeSet: Set<string> = new Set();
  for (const pad of pads) {
    makeSet.add(pad.make);
  }
  return Array.from(makeSet);
}

export function getModels(make: string): string[] {
  const pads: CoolerPad[] = padsJson.cooler_pads;
  const models = [];
  for (const pad of pads) {
    if (pad.make === make) {
      models.push(pad.model);
    }
  }
  return models;
}

export function getSizes(make: string, model: string): string[] {
  const pads: CoolerPad[] = padsJson.cooler_pads;
  const sizes = [];
  for (const pad of pads) {
    if (pad.model === model && pad.make === make) {
      if (typeof pad.size === 'object') sizes.push(...pad.size);
      else sizes.push(pad.size);
      break;
    }
  }
  return sizes;
}
