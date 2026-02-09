'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  welcomeMessage?: string;
}

const Loading: React.FC<LoadingProps> = ({ welcomeMessage = 'Welcome to akashwebd' }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let num = 0;
    
    const timer = setInterval(() => {
      num += Math.random() * 20 + 5; // 5-25% increment
      
      if (num >= 100) {
        setCounter(100);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(num));
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-screen">
      {/* Welcome Message */}
      <div className="welcome-message">{welcomeMessage}</div>

      {/* Numeric Counter */}
      <div className="numeric-counter">
        <span className="counter-number">{counter}</span>
        <span className="counter-percent">%</span>
      </div>

      {/* Counter Text */}
      <div className="counter-text">
        {counter === 0 && <span>Initializing...</span>}
        {counter > 0 && counter < 50 && <span>Loading resources...</span>}
        {counter >= 50 && counter < 100 && <span>Finalizing...</span>}
        {counter === 100 && <span>Ready!</span>}
      </div>

      {/* Animated Bottom Border */}
      <div className="loading-underline" style={{ width: `${counter}%` }}></div>
    </div>
  );
};

export default Loading;
