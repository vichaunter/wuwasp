interface MaterialCardTitleProps {
  name: string;
  category: string;
}

export function MaterialCardTitle({ name, category }: MaterialCardTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-gray-900 min-h-[48px]">
      <p className="text-xs font-medium text-center text-gray-200 truncate w-full px-1">
        {name}
      </p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">
        {category}
      </p>
    </div>
  );
}

