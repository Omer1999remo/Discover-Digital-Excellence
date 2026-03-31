import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);

    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorTextEl = cursorTextRef.current;
    if (!cursor || !cursorTextEl) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const onMouseEnterCard = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.dataset.cursorText || '';
      setCursorText(text);

      gsap.to(cursor, {
        width: text ? 80 : 60,
        height: text ? 80 : 60,
        opacity: text ? 0.9 : 0.5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const onMouseLeaveCard = () => {
      setCursorText('');
      gsap.to(cursor, {
        width: 20,
        height: 20,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('[data-cursor], button, a, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterCard);
      el.addEventListener('mouseleave', onMouseLeaveCard);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterCard);
        el.removeEventListener('mouseleave', onMouseLeaveCard);
      });
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 20,
        height: 20,
      }}
    >
      <div className="w-full h-full rounded-full bg-[#CCFF00] flex items-center justify-center">
        {cursorText && (
          <div
            ref={cursorTextRef}
            className="text-[10px] font-bold text-black uppercase tracking-wider"
          >
            {cursorText}
          </div>
        )}
      </div>
    </div>
  );
}
