'use client';

import click from '../images/click.png';
import Image from 'next/image';

interface PointProps {
  coordinates: { coordX: number; coordY: number };
  onClick: () => void;
  name: string;
}

const Point: React.FC<PointProps> = ({ coordinates, onClick, name }) => {
  return (
    <div
      className="absolute point"
      style={{
        top: `${coordinates.coordY}%`,
        left: `${coordinates.coordX}%`,
        zIndex: 99,
        cursor: 'pointer',
      }}
      onClick={onClick}
      title={name}
    >
      <Image
        src={click} // Asegúrate de que esta ruta sea correcta
        width={40}
        height={50}
        alt="Click"
        className="point-image"
      />
    </div>
  );
};

export default Point;