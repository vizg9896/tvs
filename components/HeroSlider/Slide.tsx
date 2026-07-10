"use client";

import SlideContent from "./SlideContent";
import { SlideData } from "./slideData";

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
}

export default function Slide({ slide, isActive }: SlideProps) {
  const isFirstSlide = slide.id === "jupiter-125";

  const getOrbColors = () => {
    switch (slide.id) {
      case "jupiter-125":
        return ["#F59E0B", "#D97706", "#8B5CF6"];
      case "chronos-310":
        return ["#3B82F6", "#8B5CF6", "#050816"];
      case "ronin-commander":
        return ["#8B5CF6", "#22D3EE", "#0b1220"];
      case "x-over":
        return ["#22D3EE", "#3B82F6", "#050816"];
      default:
        return [slide.accentColor, "#3B82F6", "#050816"];
    }
  };
  const [color1, color2, color3] = getOrbColors();

  return (
    <div className={`slide-wrapper ${isActive ? "active" : ""}`}>
      {/* Background Visual Layer */}
      <div className="slide-background-container">
        {/* Cinematic Gradient Overlays */}
        <div className="slide-overlay-gradient"></div>
        
        {/* Floating Blurred Ambient Orbs (Mesh Gradient & Aurora Lighting) */}
        <div className="slide-ambient-orbs">
          <div className="ambient-orb orb-1" style={{ "--orb-color": color1 } as React.CSSProperties}></div>
          <div className="ambient-orb orb-2" style={{ "--orb-color": color2 } as React.CSSProperties}></div>
          <div className="ambient-orb orb-3" style={{ "--orb-color": color3 } as React.CSSProperties}></div>
        </div>
        
        <div className="slide-radial-glow" style={{ "--glow-color": slide.glowColor } as React.CSSProperties}></div>
        
        {/* High Resolution Image with Zoom / Drift Animation */}
        <img
          src={slide.image}
          alt={slide.title}
          loading={isFirstSlide ? "eager" : "lazy"}
          className="slide-background-image"
        />
      </div>

      {/* Grid Layout Container */}
      <div className="container slide-layout-container">
        <SlideContent slide={slide} isActive={isActive} />
      </div>
    </div>
  );
}
