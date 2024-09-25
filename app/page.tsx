'use client';
import { useEffect, useState } from 'react';
import { Rotate } from './components/Rotate';
import RoomConfigurator from './components/RoomConfigurator';

// Hook personalizado para detectar dispositivo móvil y orientación
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
        const isPortrait = window.innerHeight > window.innerWidth;

        setIsMobile(isMobileDevice);
        setIsPortraitMode(isPortrait);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isPortraitMode };
};

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
