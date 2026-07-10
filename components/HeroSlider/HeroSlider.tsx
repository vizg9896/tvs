"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSlides } from "../DataContext";
import Slide from "./Slide";
import SliderControls from "./SliderControls";
import PaginationDots from "./PaginationDots";

const AUTOPLAY_DURATION = 6000;

export default function HeroSlider() {
  const slides = useSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides]);

  const handlePrev = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if the slider is in view or active document body focused
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay loop with hover pausing
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      handleNext();
    }, AUTOPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, handleNext]);

  // Swipe detection for mobile touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section
      id="hero-premium-slider"
      ref={sliderRef}
      className="hero-premium-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Futuristic Automotive Showroom"
    >
      {/* Cinematic Film Grain Overlay */}
      <div className="noise-overlay"></div>

      {/* Slides Viewport */}
      <div className="slider-viewport">
        {slides.map((slide, idx) => (
          <Slide
            key={slide.id}
            slide={slide}
            isActive={idx === currentSlide}
          />
        ))}
      </div>

      {/* Pagination & Indicator HUD Overlay */}
      <div className="slider-hud-container">
        <PaginationDots
          total={slides.length}
          current={currentSlide}
          onChange={setCurrentSlide}
          autoplayDuration={AUTOPLAY_DURATION}
          isPaused={isPaused}
          activeColor={slides[currentSlide]?.accentColor}
        />
      </div>

      {/* Next/Prev Navigation Controls */}
      <SliderControls onPrev={handlePrev} onNext={handleNext} />
    </section>
  );
}
