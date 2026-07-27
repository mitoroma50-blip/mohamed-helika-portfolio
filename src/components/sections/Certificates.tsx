import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, Maximize2, ImageIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { staggerItem } from '@/components/ui/Reveal';
import { Lightbox } from '@/components/ui/Lightbox';
import { getCertificates } from '@/lib/assets';
import type { GalleryImage } from '@/data/portfolio';

export function Certificates() {
  const certs = useMemo(() => {
  const data = getCertificates();
  console.log("Certificates:", data);
  return data;
}, []);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const gallery: GalleryImage[] = useMemo(
    () =>
      certs.map((c) => ({
        src: c.image,
        alt: `${c.title} — ${c.issuer}`,
        caption: c.title,
        tag: c.year,
      })),
    [certs]
  );

  return (
    <Section
      id="certificates"
      eyebrow="Credentials"
      title="Certificates & Training"
      description="Recognized certifications and training programs across simulation, design and manufacturing tools. Click any certificate to view it fullscreen with zoom."
    >
      {certs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert, i) => (
            <motion.button
              key={cert.title + i}
              variants={staggerItem}
              onClick={() => setOpenIndex(i)}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass p-4 text-left shadow-glass"
            >
              {/* Framed image: white border + soft shadow */}
              <div className="relative overflow-hidden rounded-xl bg-white p-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] [filter:contrast(1.06)_brightness(1.04)_saturate(1.05)]"
                  />
                  {/* hover hint */}
                  <span className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 flex items-start justify-between gap-3 px-1">
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-steel-300">{cert.issuer}</p>
                </div>
                <span className="mt-0.5 flex flex-shrink-0 items-center gap-1 rounded-full bg-steel-500/15 px-2.5 py-1 text-xs font-semibold text-steel-200">
                  <Award className="h-3.5 w-3.5" />
                  {cert.year}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <Lightbox
        images={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </Section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl glass px-6 py-16 text-center shadow-glass">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/5 text-slate-400 ring-1 ring-white/10">
        <ImageIcon className="h-7 w-7" />
      </span>
      <p className="mt-5 font-display text-lg font-semibold text-white">
        No certificates yet
      </p>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        Add images to{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-steel-200">
          /public/assets/certificates/
        </code>{' '}
        and they will appear here automatically.
      </p>
    </div>
  );
}
