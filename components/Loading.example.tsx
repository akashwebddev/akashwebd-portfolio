// Example usage of the Loading component with custom welcome messages
// Import in your layout or page component

import Loading from '@/components/Loading';

// Usage Examples:

// 1. Default welcome message
// <Loading />

// 2. Custom welcome message
// <Loading welcomeMessage="Welcome to akashwebd" />

// 3. Alternative messages
// <Loading welcomeMessage="Initializing your experience" />
// <Loading welcomeMessage="Loading awesome content" />
// <Loading welcomeMessage="Preparing the interface" />
// <Loading welcomeMessage="Building your workspace" />

// Integration in layout.tsx:
// Add this in your layout component
/*
'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading finishes after 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {isLoading && <Loading welcomeMessage="Welcome to akashwebd portfolio" />}
        {children}
      </body>
    </html>
  );
}
*/
