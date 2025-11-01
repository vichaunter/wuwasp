import { useEffect, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  title?: string;
  acceptText?: string;
  cancelText?: string;
  acceptButtonClass?: string;
  acceptDisabled?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  contentPadding?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  onAccept,
  title,
  acceptText = "Aceptar",
  cancelText = "Cancelar",
  acceptButtonClass = "bg-purple-600 hover:bg-purple-700",
  acceptDisabled = false,
  maxWidth = "max-w-md",
  maxHeight = "",
  contentPadding = "p-6",
  children,
}: ModalProps) {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className={`bg-gray-800 rounded-xl border border-gray-700 ${contentPadding} ${maxWidth} ${maxHeight} w-full mx-4 shadow-2xl relative overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Cerrar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-xl font-bold text-gray-100 mb-4 pr-8">{title}</h3>
        )}

        {/* Content */}
        <div className="mb-6">{children}</div>

        {/* Action buttons */}
        {onAccept && (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onAccept}
              disabled={acceptDisabled}
              className={`flex-1 px-4 py-2 ${acceptButtonClass} text-white rounded-lg font-medium transition-colors ${
                acceptDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {acceptText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
