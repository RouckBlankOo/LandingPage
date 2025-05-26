import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AnimatedGradient from "./components/AnimatedGradient";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [bgVisible, setBgVisible] = useState(false);

  useEffect(() => {
    // Show background slightly before preloader ends
    if (!loading) {
      setTimeout(() => {
        setBgVisible(true);
      }, 300);
    }
  }, [loading]);

  return (
    <div className="app-container">
      {/* Background animation - always present but initially opacity 0 */}
      <div
        style={{
          opacity: bgVisible ? 1 : 0,
          transition: "opacity 1.2s ease-in",
        }}
      >
        <AnimatedGradient />
      </div>

      {/* Show preloader when loading is true */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main content only visible after preloader */}
      {!loading && <LandingPage />}
    </div>
  );
}

export default App;
