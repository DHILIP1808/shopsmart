import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className="relative">
      <div
        ref={imageRef}
        className={`relative overflow-hidden cursor-zoom-in ${className}`}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          animate={{
            scale: isZoomed ? 1.5 : 1,
          }}
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Zoomed View Indicator */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs"
          >
            Hover to zoom
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};