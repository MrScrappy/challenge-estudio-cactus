'use client';

import Head from 'next/head';
import RoomConfigurator from './components/RoomConfigurator';
import { Init } from './components/Init';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsMobile(isMobileDevice);
      setIsPortrait(isPortraitMode);
      console.log(`isMobile: ${isMobileDevice}, isPortrait: ${isPortraitMode}`);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className="">
      <Head>
        <title>3D Room Configurator</title>
        <meta name="description" content="3D Room Configurator built with Next.js, Firebase, and TailwindCSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="bg-black">
          <Init />
          {/* Mostrar RoomConfigurator solo si no es móvil o si está en modo horizontal */}
          {!isMobile || !isPortrait ? (
            <RoomConfigurator />
          ) : (
            <div className="rotate-message">
              <p>Por favor, rote su dispositivo para una mejor experiencia.</p>
            </div>
          )}
          {/* <GridTemplate /> */}
        </div>
      </main>

      <style jsx>{`
        .rotate-message {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: white;
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}