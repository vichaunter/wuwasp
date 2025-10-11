interface AddButtonProps {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
}

export function AddButton({ onClick, title = "Añadir al planificador" }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 w-7 h-7 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors z-10"
      title={title}
    >
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}

