import { motion } from 'motion/react';
import logoSvg from '../../imports/logo.svg';

interface PeaLogoProps {
  size?: number;
  className?: string;
}

export function PeaLogo({ size = 40, className = '' }: PeaLogoProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size * 0.5 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img 
        src={logoSvg} 
        alt="WanduGo Logo" 
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </motion.div>
  );
}