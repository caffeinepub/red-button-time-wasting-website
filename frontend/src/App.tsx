import { useState, useEffect } from 'react';
import { usePersistedNumber } from './hooks/usePersistedNumber';

function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = usePersistedNumber('clickCount', 0);
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = () => {
    if (isExploding) return; // Prevent clicks during explosion
    
    // Use functional update to ensure we always get the latest count
    setClickCount((prevCount) => prevCount + 1);
  };

  // Separate effect to check for explosion trigger
  useEffect(() => {
    if (clickCount === 1000 && !isExploding) {
      setIsExploding(true);
    }
  }, [clickCount, isExploding]);

  // Effect to handle redirect after explosion
  useEffect(() => {
    if (isExploding) {
      // Redirect after explosion animation completes (3 seconds)
      const timer = setTimeout(() => {
        window.location.href = 'about:blank';
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Explosion effect overlay */}
      {isExploding && (
        <>
          {/* Flash effect */}
          <div className="fixed inset-0 z-50 animate-flash bg-white" />
          
          {/* Screen shake container */}
          <div className="fixed inset-0 z-40 animate-shake">
            {/* Multiple explosion particles */}
            <div className="absolute inset-0 animate-explosion-1 bg-gradient-radial from-red-500 via-orange-500 to-yellow-500 opacity-80" />
            <div className="absolute inset-0 animate-explosion-2 bg-gradient-radial from-yellow-400 via-red-600 to-purple-600 opacity-70" />
            <div className="absolute inset-0 animate-explosion-3 bg-gradient-radial from-orange-500 via-pink-500 to-red-700 opacity-60" />
            
            {/* Chaos particles */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-red-500 rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              />
            ))}
            
            {/* Cracks effect */}
            <div className="absolute inset-0 opacity-80">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="50%" x2="0%" y2="0%" stroke="black" strokeWidth="3" className="animate-crack" />
                <line x1="50%" y1="50%" x2="100%" y2="0%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.1s' }} />
                <line x1="50%" y1="50%" x2="0%" y2="100%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.2s' }} />
                <line x1="50%" y1="50%" x2="100%" y2="100%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.15s' }} />
                <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.05s' }} />
                <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.25s' }} />
                <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.12s' }} />
                <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="3" className="animate-crack" style={{ animationDelay: '0.18s' }} />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Header section with title */}
      <div className="absolute top-12 left-0 right-0 flex flex-col items-center gap-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Do Not Press
        </h1>
        
        {/* Click counter - only visible before explosion */}
        {!isExploding && (
          <div className="text-2xl md:text-3xl font-semibold text-muted-foreground">
            Clicks: <span className="text-foreground">{clickCount}</span>
          </div>
        )}
      </div>

      {/* Red button */}
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={isExploding}
        className={`
          relative w-64 h-64 md:w-80 md:h-80 rounded-full
          bg-red-button text-white font-bold text-2xl md:text-3xl
          shadow-red-glow
          transition-all duration-150 ease-out
          hover:bg-red-button-hover hover:shadow-red-glow-hover hover:scale-105
          active:scale-95 active:shadow-red-glow-active
          focus:outline-none focus:ring-4 focus:ring-red-button/30
          disabled:cursor-not-allowed disabled:opacity-50
          ${isPressed ? 'scale-95 shadow-red-glow-active' : ''}
          ${isExploding ? 'opacity-0' : ''}
        `}
        aria-label="The red button - Do Not Press"
      >
        {/* Ripple effect on click */}
        {isPressed && !isExploding && (
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        )}
        
        {/* Button text */}
        <span className="relative z-10">Do Not Press</span>
      </button>
    </div>
  );
}

export default App;
