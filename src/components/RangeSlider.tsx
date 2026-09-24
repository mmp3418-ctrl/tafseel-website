"use client";

type RangeSliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  "aria-label"?: string;
};

export default function RangeSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className = "",
  "aria-label": ariaLabel,
}: RangeSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#C3986E]/20 dark:bg-[#C3986E]/25">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C3986E] to-[#D1AC81] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="brand-range absolute inset-0 h-2.5 w-full cursor-pointer appearance-none bg-transparent"
        style={{ ["--progress" as string]: `${pct}%` }}
      />
    </div>
  );
}
