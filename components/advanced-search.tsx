'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getMakes, getModels, getSizes } from '../lib/coolerpads';

export default function AdvancedSearch() {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const makes = getMakes();
    setMakes(makes);
  }, []);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const make = event.target.value;
    const models = getModels(make);
    setSelectedMake(make);
    setModels(models);
    if (models[0]) setSelectedModel(models[0]);
    else setSelectedModel('');
    setSizes([]);
    setSelectedSize('');
    handleSearch(make);
  };
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const model = event.target.value;
    const sizes = getSizes(selectedMake, model);
    setSelectedModel(model);
    setSizes(sizes);
    if (sizes[0]) setSelectedSize(sizes[0]);
    else setSelectedSize('');
    handleSearch(model);
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSelectedSize(size);
    handleSearch(size);
  };
  return (
    <div className="flex flex-col sm:flex-row">
      {makes.length > 0 && (
        <div className="w-full min-w-24 px-0.5 sm:w-1/3">
          <label
            htmlFor="makes"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Make
          </label>
          <select
            value={selectedMake}
            onChange={(event) => handleMakeChange(event)}
            onFocus={() => handleSearch(selectedMake)}
            id="makes"
            name="selectedMakes"
            size={10}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {makes.map((make) => (
              <option value={make} key={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedMake && models.length > 0 && (
        <div className="w-full min-w-24 px-0.5 sm:w-1/3">
          <label
            htmlFor="models"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Model
          </label>
          <select
            value={selectedModel}
            onChange={(event) => handleModelChange(event)}
            onFocus={() => handleSearch(selectedModel)}
            id="models"
            name="selectedModels"
            size={10}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {models.map((model) => (
              <option value={model} key={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedModel && sizes.length > 0 && (
        <div className="w-full min-w-24 px-0.5 sm:w-1/3">
          <label
            htmlFor="sizes"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Size
          </label>
          <select
            value={selectedSize}
            onChange={(event) => handleSizeChange(event)}
            onFocus={() => handleSearch(selectedSize)}
            id="sizes"
            name="selectedSizes"
            size={10}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
