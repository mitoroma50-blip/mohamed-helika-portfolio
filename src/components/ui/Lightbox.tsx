import { useEffect, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
} from 'lucide-react';
import type { GalleryImage } from '@/data/portfolio';

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = { x: 0, y: 0 };
  const posStart = { x: 0, y: 0 };

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + images.length) % images.length;
      reset();
      onNavigate(next);
    },
    [index, images.length, onNavigate, reset]
  );

  const zoom = useCallback((dir: number) => {
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(s + dir * 0.5).toFixed(2)));
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === '+' || e.key === '=') zoom(1);
      if (e.key === '-' || e.key === '_') zoom(-1);
      if (e.key === '0') reset();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go, onClose, zoom, reset]);

  // Reset transform whenever the image changes.
  useEffect(() => {
    if (open) reset();
  }, [open, index, reset]);

  const current = index !== null ? images[index] : null;

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    posStart.x = pos.x;
    posStart.y = pos.y;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: posStart.x + (e.clientX - dragStart.x),
      y: posStart.y + (e.clientY - dragStart.y),
    });
  };

  const onPointerUp = () => setDragging(false);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-md p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Top-right controls */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            <CtrlBtn label="Zoom out" onClick={(e) => { e.stopPropagation(); zoom(-1); }} disabled={scale <= MIN_SCALE}>
              <ZoomOut className="h-5 w-5" />
            </CtrlBtn>
            <span className="rounded-full glass px-3 py-1.5 text-xs font-semibold text-white tabular-nums">
              {Math.round(scale * 100)}%
            </span>
            <CtrlBtn label="Zoom in" onClick={(e) => { e.stopPropagation(); zoom(1); }} disabled={scale >= MAX_SCALE}>
              <ZoomIn className="h-5 w-5" />
            </CtrlBtn>
            <CtrlBtn label="Reset" onClick={(e) => { e.stopPropagation(); reset(); }}>
              <Maximize className="h-5 w-5" />
            </CtrlBtn>
            <CtrlBtn label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              <X className="h-5 w-5" />
            </CtrlBtn>
          </div>

          {/* Prev / next */}
          <button
            className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass text-white transition hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass text-white transition hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full glass px-4 py-1.5 text-xs font-medium text-slate-200 tabular-nums">
            {(index ?? 0) + 1} / {images.length}
          </div>

          <motion.figure
            key={index}
            className="relative z-10 max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl glass-strong"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center overflow-auto bg-ink-950/60"
              style={{ maxHeight: '78vh' }}
            >
              <img
                src={current.src}
                alt={current.alt}
                draggable={false}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="max-h-[78vh] w-full select-none object-contain transition-transform duration-200"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setScale((s) => (s > 1 ? 1 : 2));
                  if (scale > 1) setPos({ x: 0, y: 0 });
                }}
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 bg-ink-900/80 px-6 py-4">
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {current.caption}
                </p>
                <p className="text-sm text-slate-400">{current.alt}</p>
              </div>
              <span className="rounded-full border border-steel-500/30 bg-steel-500/10 px-3 py-1 text-xs uppercase tracking-wider text-steel-300">
                {current.tag}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CtrlBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center rounded-full glass text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
