import "./LandingPage.css";
import CursorEffects from "./CursorEffects";
import Logo from "./Logo";

function LandingPage() {
  return (
    <div className="landing-page">
      <CursorEffects />
      <Logo />
      {/* Add this dummy div to enable scrolling */}
      <div style={{ height: "300vh" }}></div>
    </div>
  );
}

export default LandingPage;
