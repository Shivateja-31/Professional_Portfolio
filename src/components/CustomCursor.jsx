import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef();

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element for cursor state
      const target = e.target;
      const clickable = target.closest('button, a, input, textarea, select, [role="button"]');
      const card = target.closest('[data-cursor-text]');

      if (card) {
        setCursorType('card');
        setCursorText(card.getAttribute('data-cursor-text') || 'WATCH');
      } else if (clickable) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animateTrailer = () => {
      // Smooth linear interpolation for trailing ring
      trailX += (mouseX - trailX) * 0.16;
      trailY += (mouseY - trailY) * 0.16;
      setTrailerPos({ x: trailX, y: trailY });
      requestRef.current = requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    requestRef.current = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
        }}
      />
      <div 
        className={`custom-cursor-follower cursor-${cursorType}`}
        style={{
          transform: `translate3d(${trailerPos.x}px, ${trailerPos.y}px, 0)`
        }}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </>
  );
}

