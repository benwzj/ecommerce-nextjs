'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import padsArray from '../coolerpads.json';

type CoolerPad = {
  make: string;
  model: string;
  size: string | string[];
  id: number;
};

export default function AdvancedSearch() {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [currentMake, setCurrentMake] = useState<string>('');
  const [currentModel, setCurrentModel] = useState<string>('');
  const [currentSize, setCurrentSize] = useState<string>('');

  useEffect(() => {
    const coolerpad = padsArray.cooler_pads;
    const makeSet: Set<string> = new Set();
    for (const pad of coolerpad) {
      makeSet.add(pad.make);
    }
    setMakes(Array.from(makeSet));
    console.log(makeSet);
  }, []);

  function handleMakeSelect(text: string) {
    const pads: Array<CoolerPad> = padsArray.cooler_pads;
    const models = [];
    for (const pad of pads) {
      if (pad.make === text) {
        models.push(pad.model);
      }
    }
    //console.log (models);
    setCurrentMake(text);
    setModels(models);
    setSizes([]);
    setCurrentModel('');
    setCurrentSize('');
  }
  const handleModelSelect = (text: string) => {
    const coolerpad = padsArray.cooler_pads;
    const sizes = [];
    for (const pad of coolerpad) {
      if (pad.model === text) {
        if (typeof pad.size === 'object') sizes.push(...pad.size);
        else sizes.push(pad.size);
      }
    }
    console.log(sizes);
    setCurrentModel(text);
    setSizes(sizes);
    setCurrentSize('');
  };

  return (
    <div className="flex">
      {makes.length > 0 && (
        <MakeList cur={currentMake} makes={makes} onMakeSelect={handleMakeSelect} />
      )}
      {currentMake && models.length > 0 && (
        <ModelList cur={currentModel} models={models} onSelect={handleModelSelect} />
      )}
      {currentModel && sizes.length > 0 && (
        <SizeList cur={currentSize} sizes={sizes} onSelect={setCurrentSize} />
      )}
    </div>
  );
}

type MakeListProp = {
  cur: string;
  makes: string[];
  onMakeSelect: (text: string) => void;
};

const MakeList = ({ cur, makes, onMakeSelect }: MakeListProp) => {
  console.log(makes);
  return (
    <div className="m-2 h-52 w-3/12 border border-rose-500 p-2">
      <ul>
        {makes.map((text) => (
          <MakeItem selected={cur === text} key={text} text={text} onSelect={onMakeSelect} />
        ))}
      </ul>
    </div>
  );
};
type MakeItemProp = {
  selected: boolean;
  text: string;
  onSelect: (text: string) => void;
};
const MakeItem = ({ selected, text, onSelect }: MakeItemProp) => {
  return (
    <li>
      <div onClick={() => onSelect(text)} className={clsx({ 'bg-green-300': selected })}>
        {text}
      </div>
    </li>
  );
};

type ModelListProp = {
  cur: string;
  models: string[];
  onSelect: (text: string) => void;
};

const ModelList = ({ cur, models, onSelect }: ModelListProp) => {
  return (
    <div className="m-3 h-52 w-3/12 border border-sky-600 p-5">
      <ul>
        {models.map((text) => (
          <ModelItem selected={cur === text} key={text} text={text} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
};

type ModelItemProp = {
  selected: boolean;
  text: string;
  onSelect: (text: string) => void;
};

const ModelItem = ({ selected, text, onSelect }: ModelItemProp) => {
  return (
    <li>
      <div onClick={() => onSelect(text)} className={clsx({ 'bg-green-300': selected })}>
        {text}
      </div>
    </li>
  );
};

type SizeListProp = {
  sizes: string[];
  cur: string;
  onSelect: (text: string) => void;
};

const SizeList = ({ sizes, cur, onSelect }: SizeListProp) => {
  return (
    <div className="m-3 h-52 w-3/12 border border-purple-900 p-5">
      <ul>
        {sizes.map((text) => (
          <SizeItem selected={cur === text} key={text} text={text} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
};
type SizeItemProp = {
  selected: boolean;
  text: string;
  onSelect: (text: string) => void;
};

const SizeItem = ({ selected, text, onSelect }: SizeItemProp) => {
  return (
    <li>
      <div onClick={() => onSelect(text)} className={clsx({ 'bg-green-300': selected })}>
        {text}
      </div>
    </li>
  );
};
