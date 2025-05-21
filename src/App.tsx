import "./App.css";
import LandingPage from "./components/LandingPage";
import AnimatedGradient from "./components/AnimatedGradient";

function App() {
  return (
    <div className="app-container">
      {/* Background animation (z-index: 0) */}
      <AnimatedGradient />

      {/* Foreground page content */}
      <LandingPage />
    </div>
  );
}

export default App;
