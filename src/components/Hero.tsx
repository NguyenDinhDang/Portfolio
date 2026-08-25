import React from 'react';
import { HeroFloating } from './motion/HeroFloating';

interface HeroProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  enableParticles = true,
  enableThreeScene = true,
}) => {
  return (
    <HeroFloating
      enableParticles={enableParticles}
      enableThreeScene={enableThreeScene}
    />
  );
};
