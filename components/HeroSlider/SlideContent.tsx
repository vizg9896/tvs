"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Sliders, Gauge, Zap, Timer } from "lucide-react";
import { SlideData } from "./slideData";

interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
}

export default function SlideContent({ slide, isActive }: SlideContentProps) {
  return (
    <div className={`slide-info-container ${isActive ? "active" : ""}`}>
      {/* Sparkle Tag */}
      <div 
        className="slide-tag-badge animate-fade-in"
        style={{ 
          color: slide.accentColor,
          borderColor: `${slide.accentColor}25`,
          backgroundColor: `${slide.accentColor}05`
        }}
      >
        <Sparkles size={11} className="tag-sparkle-icon" />
        <span>{slide.tag}</span>
      </div>

      {/* Main Title */}
      <h1 className="slide-title-premium animate-reveal">
        {slide.title}
      </h1>

      {/* Description */}
      <p className="slide-desc-premium animate-fade-up">
        {slide.desc}
      </p>

      {/* Metric Stats Cards */}
      <div className="slide-stats-premium animate-fade-up-staggered">
        <div className="stat-card-glass">
          <Gauge size={16} className="stat-icon-premium" style={{ color: slide.accentColor }} />
          <span className="stat-val-premium">{slide.speed}</span>
          <span className="stat-lbl-premium">Top Speed</span>
        </div>
        <div className="stat-card-glass">
          <Zap size={16} className="stat-icon-premium" style={{ color: slide.accentColor }} />
          <span className="stat-val-premium">{slide.power}</span>
          <span className="stat-lbl-premium">Max Output</span>
        </div>
        <div className="stat-card-glass">
          <Timer size={16} className="stat-icon-premium" style={{ color: slide.accentColor }} />
          <span className="stat-val-premium">{slide.acceleration}</span>
          <span className="stat-lbl-premium">Acceleration</span>
        </div>
      </div>

      {/* Actions */}
      <div className="slide-actions-premium animate-fade-up-delayed">
        <Link 
          href={slide.primaryCta.href} 
          className="btn-premium-primary"
          style={{ 
            "--accent-color": slide.accentColor,
            "--glow-color": slide.glowColor
          } as React.CSSProperties}
        >
          <span>{slide.primaryCta.label}</span>
          <ArrowRight size={16} className="btn-icon-shift" />
        </Link>
        
        <Link 
          href={slide.secondaryCta.href} 
          className="btn-premium-secondary"
        >
          <Sliders size={16} />
          <span>{slide.secondaryCta.label}</span>
        </Link>
      </div>
    </div>
  );
}
