import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface Lazy3DSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string;
  rootMargin?: string;
}

export const Lazy3DSection: React.FC<Lazy3DSectionProps> = ({
  children,
  fallback = null,
  minHeight = '480px',
  rootMargin = '400px 0px',
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: shouldRender ? undefined : minHeight }} className="w-full h-full">
      {shouldRender ? children : fallback}
    </div>
  );
};
