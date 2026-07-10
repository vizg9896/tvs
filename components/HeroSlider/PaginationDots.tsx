"use client";

interface PaginationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
  autoplayDuration: number;
  isPaused: boolean;
  activeColor?: string;
}

export default function PaginationDots({
  total,
  current,
  onChange,
  autoplayDuration,
  isPaused,
  activeColor
}: PaginationDotsProps) {
  return (
    <div className="slider-pagination-dots">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            className={`pagination-dot-btn ${isActive ? "active" : ""}`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {isActive && (
              <span
                className="pagination-dot-progress"
                style={{
                  animationDuration: `${autoplayDuration}ms`,
                  animationPlayState: isPaused ? "paused" : "running",
                  backgroundColor: activeColor || "var(--brand)"
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
