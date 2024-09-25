import React from 'react';
import rotateImage from '../images/actualizar.png';
import Image from 'next/image';

export const Rotate = () => {
  return (
    <div className="rotate-overlay">
      <div className="rotate-content">
        <Image
          src={rotateImage} 
            width={350}
            height={350}
          alt="Rotate"
          className="rotate-image"
        />
        <h1>Rotate your device to improve the experience</h1>
      </div>

    </div>
  );
};