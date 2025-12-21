
import React, { useEffect, useRef } from 'react';
import { Star, StarLayer, StarFieldState } from '../types';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Fix: Added null as initial value to satisfy TypeScript requirement for useRef
  const requestRef = useRef<number | null>(null);
  
  // Internal state tracking similar to the provided 'sf' object
  const sf = useRef<StarFieldState>({
    parallax: true,
    parallaxSens: 0.4,
    starDensity: 1.2,
    direction: 'up', // Changed from 'right' to 'up'
    dx: 0.15,
    cw: 0,
    ch: 0,
    numStars: 0,
    stars: [],
    layers: [],
    parallaxVal: 0
  });

  const rand = (from: number, to: number) => {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  const createStar = (size: number, numberToCreate: number, cw: number, ch: number) => {
    for (let i = 0; i < numberToCreate; i++) {
      const x = rand(4, cw - 4);
      const y = rand(4, ch - 4);
      sf.current.stars.push({ x, y, s: size });
    }
  };

  const renderStarsToLayer = (size: number, bufferContext: CanvasRenderingContext2D) => {
    for (let i = 0; i < sf.current.stars.length; i++) {
      const star = sf.current.stars[i];
      if (star.s !== size) continue;

      let color = "rgba(255, 255, 255, 0.3)";
      if (star.s === 3) color = "rgba(255, 255, 255, 0.6)";
      else if (star.s === 2) color = "rgba(255, 255, 255, 0.4)";

      bufferContext.beginPath();
      bufferContext.arc(star.x, star.y, star.s, 0, Math.PI * 2, true);
      bufferContext.closePath();
      bufferContext.fillStyle = color;
      bufferContext.fill();
    }
  };

  const setup = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Reset stars
    sf.current.stars = [];
    sf.current.layers = [];
    
    const cw = window.innerWidth;
    const ch = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    
    sf.current.cw = cw;
    sf.current.ch = ch;
    
    canvas.width = cw;
    canvas.height = ch;
    
    const area = (cw * ch) / (40 * 40);
    sf.current.numStars = area * sf.current.starDensity;

    const max = 3;
    const med = 2;
    const min = 1;
    let starCount = 0;

    while (starCount <= sf.current.numStars) {
      let size = rand(1, 3);
      let count = 0;
      
      if (size === 1) {
        size = max;
        count = 1;
      } else if (size === 2) {
        size = med;
        count = 20;
      } else {
        size = min;
        count = 80;
      }

      createStar(size, count, cw, ch);
      starCount += count;
    }

    // Create layers
    for (let i = min; i <= max; i++) {
      const buffer = document.createElement('canvas');
      buffer.width = cw;
      buffer.height = ch;
      const ctx = buffer.getContext('2d');
      if (ctx) {
        renderStarsToLayer(i, ctx);
        sf.current.layers.push({ x: 0, x2: 0, y: 0, y2: 0, s: i, buffer });
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, sf.current.cw, sf.current.ch);

    for (let i = 0; i < sf.current.layers.length; i++) {
      const layer = sf.current.layers[i];
      const size = layer.s;

      // Handle Directional Movement and Wrapping
      if (sf.current.direction === 'up') {
        layer.y = layer.y <= -sf.current.ch ? 0 : layer.y - (size * sf.current.dx);
        layer.y2 = layer.y + sf.current.ch;
      } else if (sf.current.direction === 'down') {
        layer.y = layer.y >= sf.current.ch ? 0 : layer.y + (size * sf.current.dx);
        layer.y2 = layer.y - sf.current.ch;
      } else if (sf.current.direction === 'left') {
        layer.x = layer.x <= -sf.current.cw ? 0 : layer.x - (size * sf.current.dx);
        layer.x2 = layer.x + sf.current.cw;
      } else if (sf.current.direction === 'right') {
        layer.x = layer.x >= sf.current.cw ? 0 : layer.x + (size * sf.current.dx);
        layer.x2 = layer.x - sf.current.cw;
      }

      // Parallax Offset from scroll position
      const py = sf.current.parallax ? sf.current.parallaxVal * (size * sf.current.parallaxSens) : 0;

      // Draw primary tile
      ctx.drawImage(layer.buffer, layer.x, layer.y + py);
      
      // Draw wrapping tiles based on direction
      if (sf.current.direction === 'up' || sf.current.direction === 'down') {
        ctx.drawImage(layer.buffer, layer.x, layer.y2 + py);
      } else {
        ctx.drawImage(layer.buffer, layer.x2, layer.y + py);
      }

      // Extra parallax padding to ensure no gaps when scrolling vertically
      if (sf.current.parallax) {
        ctx.drawImage(layer.buffer, layer.x, layer.y + py + sf.current.ch);
        ctx.drawImage(layer.buffer, layer.x, layer.y + py - sf.current.ch);
      }
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleScroll = () => {
      sf.current.parallaxVal = window.scrollY * -1;
    };

    const handleResize = () => {
      setup();
    };

    setup();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#050505] overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default Starfield;
