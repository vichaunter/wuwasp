interface RemoveButtonProps {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
}

export function RemoveButton({ onClick, title = "Quitar del planificador" }: RemoveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
      title={title}
    >
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

