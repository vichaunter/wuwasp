interface MaterialCardProgressProps {
  available: number;
  required: number;
}

export function MaterialCardProgress({
  available,
  required,
}: MaterialCardProgressProps) {
  // Format number with 'k' suffix for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  return (
    <div className="text-center py-1 bg-gray-900">
      <div className="text-sm">
        <span className="text-white">{formatNumber(available)}</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">{formatNumber(required)}</span>
      </div>
    </div>
  );
}
