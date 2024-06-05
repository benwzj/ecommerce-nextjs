type PadsSelectProp = {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLSelectElement>) => void;
  pads: string[];
};

export default function PadsSelect({ id, value, onChange, onFocus, pads }: PadsSelectProp) {
  const labelDes = 'Select a ' + id;
  return (
    <div className="w-full min-w-24 px-0.5 sm:w-1/3">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {labelDes}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event)}
        onFocus={(event) => onFocus(event)}
        id="makes"
        name="selectedMakes"
        size={10}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {pads.map((pad) => (
          <option value={pad} key={pad}>
            {pad}
          </option>
        ))}
      </select>
    </div>
  );
}
