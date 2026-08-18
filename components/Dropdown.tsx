"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
}

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  function updateRect() {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.bottom + window.scrollY, left: r.left + window.scrollX, width: r.width });
  }

  useLayoutEffect(() => {
    if (open) updateRect();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleReposition() {
      updateRect();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 rounded-lg bg-navy-900 border border-white/10 px-3 py-2.5 text-left text-white focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className={selected ? "text-white" : "text-white/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 text-sky-300 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open &&
        mounted &&
        rect &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: "absolute", top: rect.top + 6, left: rect.left, width: rect.width }}
            className="z-50 max-h-64 overflow-y-auto rounded-lg border border-sky-400/20 bg-navy-900 shadow-xl shadow-black/50"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-sky-400/10 transition ${
                  opt.value === value ? "text-sky-300 bg-sky-400/5" : "text-white/90"
                }`}
              >
                {opt.label}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-3 py-2.5 text-sm text-white/40">No options available</div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
