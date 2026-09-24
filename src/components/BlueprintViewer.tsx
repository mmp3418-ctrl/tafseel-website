"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";
import type { ColorId, SystemId } from "@/lib/types";
import { getColor } from "@/lib/products";

interface BlueprintViewerProps {
  system: SystemId;
  widthCm: number;
  heightCm: number;
  openPercent: number;
  colorId: ColorId;
}

const VIEW_W = 520;
const VIEW_H = 460;
const PAD = 56;
const FRAME_TOP = 48;
const FRAME_BOTTOM = 28;
const FRAME_SIDE = 36;

export default function BlueprintViewer({
  system,
  widthCm,
  heightCm,
  openPercent,
  colorId,
}: BlueprintViewerProps) {
  const uid = useId().replace(/:/g, "");
  const frameHex = getColor(colorId).hex;
  const open = Math.min(100, Math.max(0, openPercent)) / 100;
  const isRoll = system === "solidroll";

  const frame = useMemo(() => {
    const maxInnerW = VIEW_W - PAD * 2 - FRAME_SIDE * 2;
    const maxInnerH = VIEW_H - PAD - FRAME_TOP - FRAME_BOTTOM - 20;
    const aspect = widthCm / Math.max(heightCm, 1);
    let innerW = maxInnerW;
    let innerH = innerW / aspect;
    if (innerH > maxInnerH) {
      innerH = maxInnerH;
      innerW = innerH * aspect;
    }
    const x = (VIEW_W - innerW) / 2;
    const y = FRAME_TOP + 12 + (maxInnerH - innerH) / 2;
    return { x, y, w: innerW, h: innerH };
  }, [widthCm, heightCm]);

  const cassetteH = isRoll ? 22 : 28;
  const revealH = frame.h * (1 - open);
  const rolledOffset = -frame.h * open;

  const slatCount = isRoll ? 28 : 4;
  const slatGap = isRoll ? 1.2 : 6;
  const slatH =
    (frame.h - slatGap * (slatCount - 1) - (isRoll ? 0 : 8)) / slatCount;

  return (
    <div className="relative h-full min-h-[340px] w-full overflow-hidden rounded-xl bg-[#0a0a0a]">
      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Top system tag */}
      <div className="absolute top-3 inset-x-0 z-10 flex justify-center">
        <span className="rounded-md border border-brand-secondary/40 bg-brand-dark/80 px-3 py-1 text-[11px] font-medium tracking-wide text-brand-secondary backdrop-blur-sm">
          صلبة/لفة
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="relative z-[1] h-full w-full"
        role="img"
        aria-label={`مخطط ${isRoll ? "SolidRoll" : "SolidPlus"} — فتح ${openPercent}%`}
      >
        <defs>
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8e0f0" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#8ab4c8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#e8f4fc" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={`metal-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lighten(frameHex, 28)} />
            <stop offset="50%" stopColor={frameHex} />
            <stop offset="100%" stopColor={darken(frameHex, 22)} />
          </linearGradient>
          <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`opening-${uid}`}>
            <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} />
          </clipPath>
          <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Outer frame */}
        <rect
          x={frame.x - 14}
          y={frame.y - cassetteH - 4}
          width={frame.w + 28}
          height={frame.h + cassetteH + 18}
          rx={3}
          fill={`url(#metal-${uid})`}
          stroke="rgba(212,175,55,0.25)"
          strokeWidth={1}
          filter={`url(#soft-${uid})`}
        />

        {/* Cassette / box */}
        <rect
          x={frame.x - 10}
          y={frame.y - cassetteH}
          width={frame.w + 20}
          height={cassetteH}
          rx={2}
          fill={darken(frameHex, 8)}
          stroke={lighten(frameHex, 18)}
          strokeWidth={0.8}
        />
        <rect
          x={frame.x - 6}
          y={frame.y - cassetteH + 5}
          width={frame.w + 12}
          height={4}
          rx={1}
          fill="#C3986E"
          opacity={0.55}
        />

        {/* Opening void */}
        <rect
          x={frame.x}
          y={frame.y}
          width={frame.w}
          height={frame.h}
          fill="#111111"
        />

        {/* Depth / room hint behind glass */}
        <rect
          x={frame.x}
          y={frame.y}
          width={frame.w}
          height={frame.h}
          fill="url(#glass-${uid})"
          opacity={0.25}
        />

        {/* Rolling curtain group */}
        <g clipPath={`url(#opening-${uid})`}>
          <motion.g
            animate={{ y: rolledOffset }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          >
            {Array.from({ length: slatCount }).map((_, i) => {
              const y = frame.y + i * (slatH + slatGap) + (isRoll ? 0 : 4);
              const panelPad = isRoll ? 2 : 8;
              const panelW = frame.w - panelPad * 2;
              const panelX = frame.x + panelPad;

              if (isRoll) {
                return (
                  <g key={i}>
                    <rect
                      x={panelX}
                      y={y}
                      width={panelW}
                      height={slatH}
                      rx={0.5}
                      fill={`url(#glass-${uid})`}
                      stroke="rgba(200,220,235,0.35)"
                      strokeWidth={0.6}
                    />
                    <rect
                      x={panelX}
                      y={y}
                      width={panelW}
                      height={slatH * 0.35}
                      fill={`url(#shine-${uid})`}
                    />
                    {/* thin aluminum edge */}
                    <rect
                      x={panelX}
                      y={y + slatH - 0.8}
                      width={panelW}
                      height={0.8}
                      fill={frameHex}
                      opacity={0.7}
                    />
                  </g>
                );
              }

              // SolidPlus: wide glass panels + thick aluminum mullions
              return (
                <g key={i}>
                  <rect
                    x={panelX}
                    y={y}
                    width={panelW}
                    height={slatH}
                    rx={1.5}
                    fill={`url(#glass-${uid})`}
                    stroke={lighten(frameHex, 10)}
                    strokeWidth={3.5}
                  />
                  <rect
                    x={panelX + 5}
                    y={y + 5}
                    width={panelW - 10}
                    height={slatH - 10}
                    rx={1}
                    fill="none"
                    stroke="rgba(232,244,252,0.25)"
                    strokeWidth={1}
                  />
                  <rect
                    x={panelX + 8}
                    y={y + 6}
                    width={panelW * 0.22}
                    height={slatH - 12}
                    fill={`url(#shine-${uid})`}
                    opacity={0.5}
                  />
                  {/* horizontal structural bar */}
                  {i < slatCount - 1 && (
                    <rect
                      x={frame.x}
                      y={y + slatH + slatGap / 2 - 2.5}
                      width={frame.w}
                      height={5}
                      fill={`url(#metal-${uid})`}
                    />
                  )}
                </g>
              );
            })}
          </motion.g>

          {/* Soft mask fade at top as it rolls */}
          {open > 0.02 && (
            <rect
              x={frame.x}
              y={frame.y}
              width={frame.w}
              height={Math.max(8, frame.h - revealH)}
              fill="#0a0a0a"
              opacity={0.15}
            />
          )}
        </g>

        {/* Side guides */}
        <rect
          x={frame.x - 6}
          y={frame.y}
          width={6}
          height={frame.h}
          fill={darken(frameHex, 12)}
        />
        <rect
          x={frame.x + frame.w}
          y={frame.y}
          width={6}
          height={frame.h}
          fill={darken(frameHex, 12)}
        />

        {/* Bottom sill */}
        <rect
          x={frame.x - 10}
          y={frame.y + frame.h}
          width={frame.w + 20}
          height={10}
          fill={`url(#metal-${uid})`}
        />

        {/* Dimension: width (top) */}
        <DimensionLine
          x1={frame.x}
          y1={frame.y - cassetteH - 18}
          x2={frame.x + frame.w}
          y2={frame.y - cassetteH - 18}
          label={`سم ${widthCm}`}
          horizontal
        />

        {/* Dimension: height (left) */}
        <DimensionLine
          x1={frame.x - 28}
          y1={frame.y}
          x2={frame.x - 28}
          y2={frame.y + frame.h}
          label={`سم ${heightCm}`}
          horizontal={false}
        />
      </svg>

      {/* Live open % chip */}
      <div className="absolute bottom-3 left-3 z-10 rounded-md border border-brand-secondary/40 bg-brand-dark/80 px-2.5 py-1 font-mono text-xs tabular-nums text-brand-secondary backdrop-blur-sm">
        {openPercent}%
      </div>
    </div>
  );
}

function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  label,
  horizontal,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  horizontal: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const tick = 5;

  return (
    <g stroke="#C3986E" strokeWidth={1} fill="#C3986E" opacity={0.85}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="3 2" />
      {horizontal ? (
        <>
          <line x1={x1} y1={y1 - tick} x2={x1} y2={y1 + tick} />
          <line x1={x2} y1={y2 - tick} x2={x2} y2={y2 + tick} />
        </>
      ) : (
        <>
          <line x1={x1 - tick} y1={y1} x2={x1 + tick} y2={y1} />
          <line x1={x2 - tick} y1={y2} x2={x2 + tick} y2={y2} />
        </>
      )}
      <rect
        x={horizontal ? midX - 28 : midX - 34}
        y={horizontal ? midY - 16 : midY - 8}
        width={56}
        height={14}
        rx={3}
        fill="#3E2E1F"
        stroke="rgba(212,175,55,0.35)"
        strokeWidth={0.8}
      />
      <text
        x={midX}
        y={horizontal ? midY - 6 : midY + 2}
        textAnchor="middle"
        fontSize={10}
        fontFamily="Cairo, Tajawal, sans-serif"
        fill="#D1AC81"
      >
        {label}
      </text>
    </g>
  );
}

function clampHex(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function lighten(hex: string, amount: number): string {
  const [r, g, b] = parseHex(hex);
  return `rgb(${clampHex(r + amount)}, ${clampHex(g + amount)}, ${clampHex(b + amount)})`;
}

function darken(hex: string, amount: number): string {
  const [r, g, b] = parseHex(hex);
  return `rgb(${clampHex(r - amount)}, ${clampHex(g - amount)}, ${clampHex(b - amount)})`;
}
