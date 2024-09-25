'use client';
import { useEffect, useState } from 'react';
import { Rotate } from './components/rotate';
import RoomConfigurator from './components/RoomConfigurator';

// Hook personalizado para detectar dispositivo móvil y orientación
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);

  useEffect(() => {
    // Función para detectar si es móvil y si está en modo retrato
    const handleResize = () => {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
        const isPortrait = window.innerHeight > window.innerWidth;

        setIsMobile(isMobileDevice);
        setIsPortraitMode(isPortrait);
      }
    };

    // Verifica el estado inicial cuando la página se carga
    handleResize();

    // Escucha cambios de tamaño de la ventana para actualizar el estado
    window.addEventListener('resize', handleResize);

    // Elimina el listener cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isPortraitMode };
};

// Componente que utiliza el hook personalizado
const MobileCheckComponent = () => {
  const { isMobile, isPortraitMode } = useMobileDetection();

  return (
    <div>
      {isMobile ? (
         <div>
          { isPortraitMode ? <Rotate/> : <RoomConfigurator />}
        </div>
      ) : (
        <RoomConfigurator />
      )}
    </div>
  );
};

export default MobileCheckComponent;
