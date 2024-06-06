'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getMakes, getModels, getSizes } from '../lib/coolerpads';
import PadsSelect from './layout/pads-select';

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
        <PadsSelect
          id="Make"
          value={selectedMake}
          pads={makes}
          onChange={handleMakeChange}
          onFocus={handleMakeChange}
        />
      )}
      {selectedMake && models.length > 0 && (
        <PadsSelect
          id="Model"
          value={selectedModel}
          pads={models}
          onChange={handleModelChange}
          onFocus={handleModelChange}
        />
      )}
      {selectedModel && sizes.length > 0 && (
        <PadsSelect
          id="Size"
          value={selectedSize}
          pads={sizes}
          onChange={handleSizeChange}
          onFocus={handleSizeChange}
        />
      )}
    </div>
  );
}
