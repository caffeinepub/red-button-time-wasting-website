import { useEffect, useState } from "react";

function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (isExploding) return;
    setClickCount((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExploding) return;
      if (
        ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"].includes(e.key)
      )
        return;
      setIsPressed(true);
      setClickCount((prev) => prev + 1);
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
    if (clickCount >= 1000 && !isExploding) {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isExploding && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "radial-gradient(circle, #ef4444, #f97316, #eab308)",
            opacity: 0.9,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
          }}
        >
          Do Not Press
        </h1>
        {!isExploding && (
          <div
            style={{ fontSize: "1.5rem", fontWeight: 600, color: "#9ca3af" }}
          >
            Clicks: <span style={{ color: "#ffffff" }}>{clickCount}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleClick}
        onMouseDown={(e) => {
          if (e.button === 0) setIsPressed(true);
        }}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={{
          position: "relative",
          zIndex: 20,
          width: 280,
          height: 280,
          borderRadius: "50%",
          backgroundColor: isPressed ? "#b91c1c" : "#dc2626",
          border: "none",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "1.5rem",
          cursor: "pointer",
          transform: isPressed ? "scale(0.95)" : "scale(1)",
          transition: "transform 0.1s, background-color 0.1s",
          boxShadow:
            "0 0 40px rgba(220,38,38,0.6), 0 10px 40px rgba(220,38,38,0.4)",
          userSelect: "none",
          outline: "none",
          opacity: isExploding ? 0 : 1,
        }}
        aria-label="Do Not Press"
      >
        Do Not Press
      </button>
    </div>
  );
}

export default App;
