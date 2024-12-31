'use client';

import { useEffect } from 'react';

export default function KeepAlive() {
  useEffect(() => {
    const keepAlive = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
      } catch (error) {
        console.error('Error en ping:', error);
      }
    };

    const interval = setInterval(keepAlive, 300000);
    return () => clearInterval(interval);
  }, []);

  return null; 
} 