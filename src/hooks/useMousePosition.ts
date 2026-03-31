import { useState, useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export function useMagnetic(ref: React.RefObject<HTMLElement>, strength: number = 0.3) {
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const animationRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const currentRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.15);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.15);
    currentRef.current.rotateX = lerp(currentRef.current.rotateX, targetRef.current.rotateX, 0.15);
    currentRef.current.rotateY = lerp(currentRef.current.rotateY, targetRef.current.rotateY, 0.15);

    setTransform({
      x: currentRef.current.x,
      y: currentRef.current.y,
      rotateX: currentRef.current.rotateX,
      rotateY: currentRef.current.rotateY
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(animate);
    animationRef.current = frameId;
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [animate]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const threshold = 200;
      
      if (distance < threshold) {
        const factor = (1 - distance / threshold) * strength;
        targetRef.current.x = distanceX * factor;
        targetRef.current.y = distanceY * factor;
        targetRef.current.rotateY = (distanceX / threshold) * 5;
        targetRef.current.rotateX = -(distanceY / threshold) * 5;
      } else {
        targetRef.current.x = 0;
        targetRef.current.y = 0;
        targetRef.current.rotateX = 0;
        targetRef.current.rotateY = 0;
      }
    };

    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      targetRef.current.rotateX = 0;
      targetRef.current.rotateY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);

  return transform;
}
