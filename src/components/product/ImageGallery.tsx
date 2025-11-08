import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageZoom } from './ImageZoom';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // For demo, we'll show the same image multiple times
  // In production, you'd have multiple product images
  const galleryImages = images.length > 1 ? images : [images[0], images[0], images[0], images[0]];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <ImageZoom
          src={galleryImages[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          className="w-full h-full"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2">
        {galleryImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedIndex === index
                ? 'border-primary-600'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};