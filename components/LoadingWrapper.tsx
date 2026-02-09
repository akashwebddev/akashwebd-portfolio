'use client';

import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function LoadingWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading after counter reaches 100 (approximately 3-4 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return <Loading welcomeMessage="Welcome to akashwebd portfolio" />;
}
