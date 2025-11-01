interface FilterOption<T> {
  value: T | "ALL";
  label: string;
  count?: number;
}

interface FilterGroupProps<T> {
  title: string;
  options: FilterOption<T>[];
  selected: T | "ALL";
  onSelect: (value: T | "ALL") => void;
}

export function FilterGroup<T>({
  title,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={String(option.value)}
              onClick={() => onSelect(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {option.label}
              {option.count !== undefined && (
                <span className="ml-2 text-xs opacity-75">
                  ({option.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

