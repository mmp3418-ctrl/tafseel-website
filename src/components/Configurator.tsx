"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  Ruler,
  Palette,
  Settings2,
  Layers,
} from "lucide-react";
import type {
  ColorId,
  ConfigState,
  ConfigStep,
  HardwareId,
  SystemId,
} from "@/lib/types";
import {
  COLORS,
  DEFAULT_CONFIG,
  HARDWARE,
  SYSTEMS,
  calculatePrice,
  formatSAR,
  getColor,
  getHardware,
  getSystem,
  getWhatsAppUrl,
} from "@/lib/products";
import BlueprintViewer from "./BlueprintViewer";
import RangeSlider from "./RangeSlider";
import { useApp } from "@/components/providers/AppProviders";

const STEP_ICONS = [Layers, Ruler, Settings2, Palette] as const;

function SystemIcon({ type }: { type: SystemId }) {
  if (type === "solidroll") {
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <rect x="8" y="6" width="32" height="6" rx="1" fill="#C3986E" opacity="0.9" />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={i}
            x="10"
            y={14 + i * 3.2}
            width="28"
            height="2.4"
            rx="0.4"
            fill="#9EB9E1"
            opacity={0.55}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
      <rect
        x="8"
        y="6"
        width="32"
        height="36"
        rx="2"
        fill="none"
        stroke="#C3986E"
        strokeWidth="2.5"
      />
      <rect
        x="12"
        y="10"
        width="24"
        height="12"
        rx="1"
        fill="#9EB9E1"
        opacity="0.4"
        stroke="#C3986E"
        strokeWidth="1.5"
      />
      <rect
        x="12"
        y="26"
        width="24"
        height="12"
        rx="1"
        fill="#9EB9E1"
        opacity="0.4"
        stroke="#C3986E"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Configurator() {
  const { t, dir, locale } = useApp();
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [step, setStep] = useState<ConfigStep>(1);

  const price = useMemo(() => calculatePrice(config), [config]);
  const system = getSystem(config.system);
  const hardware = getHardware(config.hardware);
  const color = getColor(config.color);

  const steps = useMemo(
    () =>
      t.configurator.steps.map((label, i) => ({
        id: (i + 1) as ConfigStep,
        label,
        icon: STEP_ICONS[i],
      })),
    [t]
  );

  const update = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="configurator" className="relative bg-brand-bg py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
          dir={dir}
        >
          <span className="brand-badge mb-4">✦ {t.configurator.badge}</span>
          <h2 className="mt-4 text-3xl font-bold text-brand-dark sm:text-4xl">
            {t.configurator.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-text-light">
            {t.configurator.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="brand-card overflow-hidden rounded-2xl transition-all duration-300 hover:border-[#C3986E]/50 xl:col-span-7">
            <div className="h-[380px] sm:h-[460px] lg:h-[520px]">
              <BlueprintViewer
                system={config.system}
                widthCm={config.widthCm}
                heightCm={config.heightCm}
                openPercent={config.openPercent}
                colorId={config.color}
              />
            </div>

            <div className="border-t border-brand-brown/15 px-5 py-4" dir={dir}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="text-sm text-brand-text-light">
                  {t.configurator.openClose}
                </label>
                <motion.span
                  key={config.openPercent}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold tabular-nums text-brand-accent"
                >
                  {config.openPercent}%
                </motion.span>
              </div>
              <RangeSlider
                value={config.openPercent}
                min={0}
                max={100}
                onChange={(v) => update("openPercent", v)}
                aria-label={t.configurator.openClose}
              />
              <div className="mt-2 flex justify-between text-[10px] text-brand-text-light">
                <span>{t.configurator.closed}</span>
                <span>{t.configurator.open}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:col-span-5">
            <div className="brand-card rounded-2xl p-4 sm:p-5" dir={dir}>
              <div className="mb-5 flex gap-1 overflow-x-auto pb-1">
                {steps.map((s) => {
                  const Icon = s.icon;
                  const active = step === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStep(s.id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02] ${
                        active
                          ? "bg-brand-secondary text-brand-dark shadow-md shadow-brand-accent/15"
                          : "border border-brand-brown/15 bg-brand-bg text-brand-text-light hover:border-[#C3986E]"
                      }`}
                    >
                      <span
                        className={`tabular-nums ${
                          active ? "opacity-70" : "text-brand-accent"
                        }`}
                      >
                        {String(s.id).padStart(2, "0")}
                      </span>
                      <Icon className="h-3.5 w-3.5" />
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: dir === "rtl" ? 14 : -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === "rtl" ? -14 : 14 }}
                  transition={{ duration: 0.22 }}
                >
                  {step === 1 && (
                    <div className="space-y-3">
                      {SYSTEMS.map((sys) => (
                        <motion.button
                          key={sys.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => update("system", sys.id as SystemId)}
                          className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${
                            config.system === sys.id
                              ? "border-[#C3986E]/50 bg-brand-secondary/15"
                              : "border-brand-brown/15 bg-brand-bg hover:border-[#C3986E]"
                          } ${dir === "rtl" ? "text-right" : "text-left"}`}
                        >
                          <SystemIcon type={sys.id} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="brand-badge !px-2 !py-0.5 !text-[10px]">
                                {sys.badge}
                              </span>
                              <span className="font-semibold text-brand-dark">
                                {locale === "ar" ? sys.nameAr : sys.nameEn}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-brand-text-light">
                              {locale === "ar" ? sys.nameEn : sys.nameAr}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className="mb-3 flex items-center justify-between text-sm text-brand-text-light">
                          <span>{t.configurator.width}</span>
                          <span className="font-semibold tabular-nums text-brand-accent">
                            {config.widthCm}
                          </span>
                        </label>
                        <RangeSlider
                          value={config.widthCm}
                          min={80}
                          max={600}
                          step={5}
                          onChange={(v) => update("widthCm", v)}
                          aria-label={t.configurator.width}
                          className="mb-2"
                        />
                        <input
                          type="number"
                          min={80}
                          max={600}
                          value={config.widthCm}
                          onChange={(e) =>
                            update(
                              "widthCm",
                              Math.min(
                                600,
                                Math.max(80, Number(e.target.value) || 80)
                              )
                            )
                          }
                          className="input-brand text-left tabular-nums"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="mb-3 flex items-center justify-between text-sm text-brand-text-light">
                          <span>{t.configurator.height}</span>
                          <span className="font-semibold tabular-nums text-brand-accent">
                            {config.heightCm}
                          </span>
                        </label>
                        <RangeSlider
                          value={config.heightCm}
                          min={100}
                          max={500}
                          step={5}
                          onChange={(v) => update("heightCm", v)}
                          aria-label={t.configurator.height}
                          className="mb-2"
                        />
                        <input
                          type="number"
                          min={100}
                          max={500}
                          value={config.heightCm}
                          onChange={(e) =>
                            update(
                              "heightCm",
                              Math.min(
                                500,
                                Math.max(100, Number(e.target.value) || 100)
                              )
                            )
                          }
                          className="input-brand text-left tabular-nums"
                          dir="ltr"
                        />
                      </div>
                      <p className="rounded-lg border border-brand-brown/15 bg-brand-bg px-3 py-2.5 text-xs text-brand-text-light">
                        {t.configurator.area}:{" "}
                        <span className="font-semibold text-brand-accent">
                          {price.areaM2} m²
                        </span>
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3">
                      {HARDWARE.map((hw) => (
                        <button
                          key={hw.id}
                          type="button"
                          onClick={() =>
                            update("hardware", hw.id as HardwareId)
                          }
                          className={`w-full rounded-xl border p-4 transition-all hover:scale-[1.02] ${
                            config.hardware === hw.id
                              ? "border-[#C3986E]/50 bg-brand-secondary/15"
                              : "border-brand-brown/15 bg-brand-bg hover:border-[#C3986E]"
                          } ${dir === "rtl" ? "text-right" : "text-left"}`}
                        >
                          <span className="font-semibold text-brand-dark">
                            {hw.nameAr}
                          </span>
                          <p className="mt-1 text-xs text-brand-text-light">
                            {hw.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update("color", c.id as ColorId)}
                          className={`rounded-xl border p-3 transition-all hover:scale-[1.02] ${
                            config.color === c.id
                              ? "border-[#C3986E]/50 bg-brand-secondary/15"
                              : "border-brand-brown/15 bg-brand-bg hover:border-[#C3986E]"
                          } ${dir === "rtl" ? "text-right" : "text-left"}`}
                        >
                          <span
                            className="mb-2 block h-9 w-full rounded-lg border border-brand-brown/20 shadow-inner"
                            style={{ background: c.hex }}
                          />
                          <span className="block text-xs font-medium text-brand-dark">
                            {c.nameAr}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  disabled={step === 1}
                  onClick={() =>
                    setStep((s) => (s > 1 ? ((s - 1) as ConfigStep) : s))
                  }
                  className="flex-1 rounded-xl border border-brand-brown/20 py-2.5 text-sm text-brand-text-light transition hover:border-[#C3986E] hover:bg-brand-bg disabled:opacity-30"
                >
                  {t.configurator.prev}
                </button>
                <button
                  type="button"
                  disabled={step === 4}
                  onClick={() =>
                    setStep((s) => (s < 4 ? ((s + 1) as ConfigStep) : s))
                  }
                  className="flex-1 rounded-xl bg-brand-accent py-2.5 text-sm font-semibold text-brand-white transition hover:scale-[1.02] hover:bg-brand-secondary hover:text-brand-dark disabled:opacity-30"
                >
                  {t.configurator.next}
                </button>
              </div>
            </div>

            <div
              className="brand-card rounded-2xl border-brand-accent/25 bg-gradient-to-bl from-brand-secondary/15 via-brand-surface to-brand-bg p-5"
              dir={dir}
            >
              <h3 className="mb-3 text-sm font-medium text-brand-text-light">
                {t.configurator.summary}
              </h3>
              <ul className="mb-5 space-y-2 text-sm">
                <li className="flex justify-between gap-2">
                  <span className="text-brand-text-light">
                    {t.configurator.system}
                  </span>
                  <span className="font-medium text-brand-dark">
                    {locale === "ar" ? system.nameAr : system.nameEn}
                  </span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-brand-text-light">
                    {t.configurator.dimensions}
                  </span>
                  <span
                    className="font-medium tabular-nums text-brand-dark"
                    dir="ltr"
                  >
                    {config.widthCm} × {config.heightCm} cm
                  </span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-brand-text-light">
                    {t.configurator.hardware}
                  </span>
                  <span className="font-medium text-brand-dark">
                    {hardware.nameAr}
                  </span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-brand-text-light">
                    {t.configurator.frameColor}
                  </span>
                  <span className="flex items-center gap-2 font-medium text-brand-dark">
                    <span
                      className="inline-block h-3 w-3 rounded-full border border-brand-brown/20"
                      style={{ background: color.hex }}
                    />
                    {color.nameAr}
                  </span>
                </li>
                <li className="flex justify-between gap-2 border-t border-brand-brown/15 pt-2 text-xs text-brand-text-light">
                  <span>{t.configurator.estimate}</span>
                  <span className="tabular-nums text-brand-accent">
                    {formatSAR(price.total)}
                  </span>
                </li>
              </ul>

              <a
                href={getWhatsAppUrl(config)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/35 bg-[#25D366]/12 py-3.5 text-sm font-bold text-[#128C7E] transition hover:scale-[1.02] hover:bg-[#25D366]/18"
              >
                <MessageCircle className="h-4 w-4" />
                {t.configurator.whatsappOrder}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
