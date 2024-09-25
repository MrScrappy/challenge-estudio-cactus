import React from 'react';
import rotateImage from '../images/actualizar.png';
import Image from 'next/image';

export const Rotate = () => {
  return (
    <div className="rotate-overlay">
      <div className="rotate-content">
        <Image
          src={rotateImage} // Asegúrate de que esta ruta sea correcta
        //   width={40}
        //   height={50}
          alt="Rotate"
          className="rotate-image"
        />
        <h2>Rotate your device to improve the experience</h2>
      </div>
      <style jsx>{`
        .rotate-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Fondo gris transparente */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
        }
        .rotate-content {
          text-align: center;
          color: white;
        }
        .rotate-image {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};