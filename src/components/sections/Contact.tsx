import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, Download, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { staggerItem } from '@/components/ui/Reveal';
import { profile } from '@/data/portfolio';
import { downloadCv } from '@/lib/cv';

export function Contact() {
  const links = [
    {
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: profile.social.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: 'Email',
      value: profile.social.email.replace('mailto:', ''),
      href: profile.social.email,
      icon: Mail,
      external: false,
    },
    {
      label: 'Phone',
      value: profile.social.phone,
      href: profile.social.phoneHref,
      icon: Phone,
      external: false,
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Precise"
      description="Open to engineering opportunities, collaborations and technical discussions with industry leaders."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Contact cards */}
        <div className="grid gap-5 sm:grid-cols-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                variants={staggerItem}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group flex items-center justify-between gap-5 rounded-2xl glass p-6 shadow-glass"
              >
                <div className="flex items-center gap-5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-steel-500/15 text-cyan-glow ring-1 ring-white/10 transition group-hover:bg-steel-500/25 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      {link.label}
                    </p>
                    <p className="mt-0.5 font-display text-base font-semibold text-white">
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-steel-300" />
              </motion.a>
            );
          })}
        </div>

        {/* CTA panel */}
        <motion.div
          variants={staggerItem}
          className="relative overflow-hidden rounded-2xl glass-strong p-8 shadow-glow-lg"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-steel-600/30 blur-3xl" />
          <h3 className="relative font-display text-2xl font-bold text-white">
            Ready to collaborate?
          </h3>
          <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
            Download my full CV for a detailed overview of my engineering
            background, projects and certifications.
          </p>
          <button
            onClick={downloadCv}
            className="relative mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-steel-500 to-steel-700 px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:from-steel-400 hover:to-steel-600"
          >
            <Download className="h-4.5 w-4.5" />
            Download CV
          </button>
          <p className="relative mt-6 text-xs text-slate-500">
            {profile.location} · {profile.title}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
