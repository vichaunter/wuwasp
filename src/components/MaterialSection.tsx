import type { ReactNode } from 'react';

interface MaterialSectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function MaterialSection({ title, subtitle, children }: MaterialSectionProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          {title}
        </h2>
        <p className="text-gray-400 text-sm">
          {subtitle}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {children}
      </div>
    </section>
  );
}

