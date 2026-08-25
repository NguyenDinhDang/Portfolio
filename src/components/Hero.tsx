import React from 'react';
import { HeroFloating } from './motion/HeroFloating';

interface HeroProps {
  enableParticles?: boolean;
  enableThreeScene?: boolean;
  line1?: string;
  line2Prefix?: string;
  line2Accent?: string;
}

export const Hero: React.FC<HeroProps> = ({
  enableParticles = true,
  enableThreeScene = false,
  line1,
  line2Prefix,
  line2Accent,
}) => {
  return (
    <HeroFloating
      enableParticles={enableParticles}
      enableThreeScene={enableThreeScene}
      line1={line1}
      line2Prefix={line2Prefix}
      line2Accent={line2Accent}
    />
  );
};
