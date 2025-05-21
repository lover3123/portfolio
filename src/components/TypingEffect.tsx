import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypingEffectProps {
  sequence: (string | number)[];
  className?: string;
  cursor?: boolean;
  repeat?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  sequence, 
  className = '', 
  cursor = true,
  repeat = Infinity 
}) => {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      cursor={cursor}
      repeat={repeat}
      className={className}
    />
  );
};

export default TypingEffect;