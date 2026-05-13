import { motion } from 'motion/react';
import chatImage from 'figma:asset/db0c835a43bab7d3ae8a26f5a123170847864a02.png';
import groupBuyingImage from 'figma:asset/cf7b7020c9fca1bda07b8df4c31e045a45128843.png';
import mapImage from 'figma:asset/de98007817a05144421b8e01a546591edae83f3c.png';

interface PhoneMockupProps {
  variant?: 'jobs' | 'community' | 'map';
}

export function PhoneMockup({ variant = 'jobs' }: PhoneMockupProps) {
  // Map variants to images
  const imageMap = {
    jobs: groupBuyingImage,
    community: chatImage,
    map: mapImage
  };

  const selectedImage = imageMap[variant];

  return (
    <motion.div 
      className="relative w-64 mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Phone Frame */}
      <div className="relative bg-white rounded-[2.5rem] p-3 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-300">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-b-3xl z-10"></div>
        
        {/* Screen with actual app screenshot */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5]">
          <img 
            src={selectedImage} 
            alt={`WanduGo ${variant} screen`}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
      
      {/* Shadow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"></div>
      </div>
    </motion.div>
  );
}