import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'hover' | 'drag' | 'explore';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(true);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string>('');

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        const customLabel = cursorTarget.getAttribute('data-cursor-label') || '';
        setMode(customMode || 'hover');
        setLabel(customLabel);
        return;
      }

      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setMode('hover');
        setLabel('');
        return;
      }

      if (target.closest('canvas')) {
        setMode('drag');
        setLabel('DRAG');
        return;
      }

      setMode('default');
      setLabel('');
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationId: number;
    const render = () => {
      // Lerp ring towards dot
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [visible]);

  if (isTouch) return null;

  const getRingClasses = () => {
    switch (mode) {
      case 'drag':
        return 'w-16 h-16 -ml-8 -mt-8 border-amber-copper/80 bg-amber-copper/10 backdrop-blur-[1px]';
      case 'explore':
        return 'w-20 h-20 -ml-10 -mt-10 border-cream-200/80 bg-cream-100/10';
      case 'hover':
        return 'w-12 h-12 -ml-6 -mt-6 border-amber-copper/90 bg-amber-copper/15 scale-110';
      default:
        return 'w-8 h-8 -ml-4 -mt-4 border-cream-300/40';
    }
  };

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-amber-copper transition-transform duration-75 pointer-events-none"
      />
      {/* Follower ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 pointer-events-none flex items-center justify-center ${getRingClasses()}`}
      >
        {label && (
          <span className="text-[9px] uppercase tracking-widest-luxury font-medium text-amber-copper">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
