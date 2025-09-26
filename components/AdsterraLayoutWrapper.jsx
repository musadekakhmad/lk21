"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClick = (e) => {
        const targetUrl = window.location.href;
      };
  
      window.addEventListener('click', handleClick);

      // Memuat skrip iklan Native Banner
      const nativeBannerScript = document.createElement('script');
      nativeBannerScript.src = "//discreetisabella.com/53e9873acb732e3714c0472b0f8d3ec1/invoke.js";
      nativeBannerScript.async = true;
      nativeBannerScript.setAttribute('data-cfasync', 'false');
      document.body.appendChild(nativeBannerScript);

      // Memuat skrip iklan Popunder
      const popunderScript = document.createElement('script');
      popunderScript.type = 'text/javascript';
      popunderScript.src = "//discreetisabella.com/9b/ee/8d/9bee8d55d96d0ff404ef76c72ffb6c09.js";
      popunderScript.async = true;
      document.body.appendChild(popunderScript);

      // Memuat skrip iklan Social Bar
      const socialBarScript = document.createElement('script');
      socialBarScript.type = 'text/javascript';
      socialBarScript.src = "//discreetisabella.com/e2/f5/d2/e2f5d243e928a0b1020b88a41287aef1.js";
      socialBarScript.async = true;
      document.body.appendChild(socialBarScript);
  
      return () => {
        window.removeEventListener('click', handleClick);
        document.body.removeChild(nativeBannerScript);
        document.body.removeChild(popunderScript);
        document.body.removeChild(socialBarScript);
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}