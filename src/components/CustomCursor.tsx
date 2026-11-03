import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only activate for devices that support fine hover pointers (mice, trackpads)
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointerFine) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cursor position state (instant)
    const mouse = {
      x: -100,
      y: -100,
      isHovering: false,
      isDown: false,
      active: false,
      opacity: 0,
    };

    // Trailing circle position (lerped follower)
    const follower = {
      x: -100,
      y: -100,
      radius: 16,
      targetRadius: 16,
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.active = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // If follower is uninitialized, snap directly to start position
      if (follower.x < 0) {
        follower.x = mouse.x;
        follower.y = mouse.y;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handlePointerDown = () => {
      mouse.isDown = true;
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    // Detect if hovering over clickable or interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .pointer-events-auto, [onclick], .laptop-screen-display'
      );
      mouse.isHovering = !!interactive;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth fade in / fade out
      const targetOpacity = mouse.active ? 1 : 0;
      mouse.opacity += (targetOpacity - mouse.opacity) * 0.15;

      if (mouse.opacity > 0.01) {
        // Follower physics: smooth lag behind the primary cursor dot
        const followSpeed = mouse.isDown ? 0.22 : 0.16;
        follower.x += (mouse.x - follower.x) * followSpeed;
        follower.y += (mouse.y - follower.y) * followSpeed;

        // Target radius scales up when hovering interactive elements, compresses slightly on click
        let desiredRadius = mouse.isHovering ? 26 : 16;
        if (mouse.isDown) {
          desiredRadius *= 0.82;
        }
        follower.radius += (desiredRadius - follower.radius) * 0.14;

        ctx.save();
        ctx.globalAlpha = mouse.opacity;

        // 1. Draw Trailing Following Circle (behind the white dot)
        ctx.beginPath();
        ctx.arc(follower.x, follower.y, follower.radius, 0, Math.PI * 2);
        ctx.lineWidth = mouse.isHovering ? 1.75 : 1.25;
        ctx.strokeStyle = mouse.isHovering
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();

        // Subtle translucent fill when hovering to highlight click target
        if (mouse.isHovering) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fill();
        }

        // 2. Draw Solid White Dot (exact mouse position)
        const dotRadius = mouse.isHovering ? 2.5 : 3.5;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
