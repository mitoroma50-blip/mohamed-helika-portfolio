import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { staggerItem } from '@/components/ui/Reveal';
import { Lightbox } from '@/components/ui/Lightbox';
import { featuredProject } from '@/data/portfolio';
import { getProjectGallery } from '@/lib/assets';

export function FeaturedProject() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gallery = useMemo(() => getProjectGallery(), []);

  return (
    <Section
      id="project"
      eyebrow="Featured Project"
      title={featuredProject.title}
      description={featuredProject.subtitle}
    >
      {/* Overview + stats */}
      <motion.div
        variants={staggerItem}
        className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="glass rounded-2xl p-7 shadow-glass">
          <h3 className="font-display text-lg font-semibold text-white">
            Project Overview
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {featuredProject.overview}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['CAD', 'Topology', 'FEA', 'Additive Mfg'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featuredProject.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 shadow-glass"
            >
              <p className="font-display text-2xl font-bold text-gradient-blue">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Gallery */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {gallery.map((img, i) => (
          <motion.button
            key={img.caption}
            variants={staggerItem}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl glass text-left shadow-glass"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <span className="rounded-full border border-steel-500/30 bg-steel-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-steel-200 backdrop-blur-sm">
                  {img.tag}
                </span>
                <p className="mt-2 font-display text-lg font-semibold text-white">
                  {img.caption}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full glass text-white opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="h-4.5 w-4.5" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Workflow strip */}
      <motion.div
        variants={staggerItem}
        className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl glass p-6 shadow-glass"
      >
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-slate-300">
          Workflow
        </p>
        {['Baseline CAD', 'Topology Optimization', 'ANSYS Validation', 'Final Design'].map(
          (step, i, arr) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/10">
                {step}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight className="h-4 w-4 text-steel-400" />
              )}
            </div>
          )
        )}
      </motion.div>

      <Lightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </Section>
  );
}
