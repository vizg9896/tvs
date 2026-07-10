"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function SliderControls({ onPrev, onNext }: SliderControlsProps) {
  return (
    <div className="slider-controls-container">
      <button
        onClick={onPrev}
        className="slider-nav-btn prev-btn"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} className="nav-arrow-icon" />
      </button>

      <button
        onClick={onNext}
        className="slider-nav-btn next-btn"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} className="nav-arrow-icon" />
      </button>
    </div>
  );
}
