import { useEffect, useState } from "react";

function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (isExploding) return;
    setClickCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExploding) return;
      if (
        ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"].includes(e.key)
      )
        return;
      setIsPressed(true);
      setClickCount((prevCount) => prevCount + 1);
    };
    const handleKeyUp = () => setIsPressed(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isExploding]);

  useEffect(() => {
    if (clickCount === 1000 && !isExploding) {
      setIsExploding(true);
    }
  }, [clickCount, isExploding]);

  useEffect(() => {
    if (isExploding) {
      const timer = setTimeout(() => {
        window.location.href = "about:blank";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: `particle-${i}`,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    delay: `${(i * 0.017) % 0.5}s`,
    duration: `${0.5 + ((i * 0.033) % 1)}s`,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {isExploding && (
        <>
          <div className="fixed inset-0 z-50 animate-flash bg-white" />
          <div className="fixed inset-0 z-40 animate-shake">
            <div className="absolute inset-0 animate-explosion-1 bg-gradient-radial from-red-500 via-orange-500 to-yellow-500 opacity-80" />
            <div className="absolute inset-0 animate-explosion-2 bg-gradient-radial from-yellow-400 via-red-600 to-purple-600 opacity-70" />
            <div className="absolute inset-0 animate-explosion-3 bg-gradient-radial from-orange-500 via-pink-500 to-red-700 opacity-60" />
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute w-4 h-4 bg-red-500 rounded-full animate-particle"
                style={{
                  left: p.left,
                  top: p.top,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
            <div className="absolute inset-0 opacity-80">
              <svg
                role="presentation"
                aria-hidden="true"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50%"
                  y1="50%"
                  x2="0%"
                  y2="0%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="100%"
                  y2="0%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.1s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="0%"
                  y2="100%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.2s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="100%"
                  y2="100%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.15s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="0%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.05s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="100%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.25s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="0%"
                  y2="50%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.12s" }}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="black"
                  strokeWidth="3"
                  className="animate-crack"
                  style={{ animationDelay: "0.18s" }}
                />
              </svg>
            </div>
          </div>
        </>
      )}

      <div className="absolute top-12 left-0 right-0 flex flex-col items-center gap-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Do Not Press
        </h1>
        {!isExploding && (
          <div className="text-2xl md:text-3xl font-semibold text-muted-foreground">
            Clicks: <span className="text-foreground">{clickCount}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        data-ocid="donotpress.primary_button"
        onClick={handleClick}
        onMouseDown={(e) => {
          if (e.button === 0) setIsPressed(true);
        }}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={isExploding}
        style={{
          cursor: isExploding ? "not-allowed" : "pointer",
          backgroundColor: isPressed ? "#b91c1c" : "#dc2626",
          boxShadow: isPressed
            ? "0 5px 20px -5px rgba(220,38,38,0.4)"
            : "0 10px 40px -10px rgba(220,38,38,0.5), 0 0 0 1px rgba(220,38,38,0.1)",
        }}
        className={`
          relative w-64 h-64 md:w-80 md:h-80 rounded-full
          text-white font-bold text-2xl md:text-3xl
          transition-all duration-150 ease-out
          hover:scale-105
          active:scale-95
          focus:outline-none focus:ring-4 focus:ring-red-500/30
          disabled:cursor-not-allowed disabled:opacity-50
          select-none
          ${isPressed ? "scale-95" : ""}
          ${isExploding ? "opacity-0" : ""}
        `}
        aria-label="The red button - Do Not Press"
      >
        {isPressed && !isExploding && (
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        )}
        <span className="relative z-10">Do Not Press</span>
      </button>
    </div>
  );
}

export default App;
