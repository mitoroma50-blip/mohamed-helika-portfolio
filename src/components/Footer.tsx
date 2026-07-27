import { Linkedin, Mail, Phone, Github } from 'lucide-react';
import { profile, navItems } from '@/data/portfolio';
import { downloadCv } from '@/lib/cv';

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-steel-400 to-steel-700 font-display text-sm font-bold text-white shadow-glow">
                MH
              </span>
              <span className="font-display text-lg font-semibold text-white">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {profile.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-300">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-steel-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-300">
              Connect
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-slate-400 transition hover:text-steel-300"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={profile.social.email}
                className="inline-flex items-center gap-3 text-sm text-slate-400 transition hover:text-steel-300"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href={profile.social.phoneHref}
                className="inline-flex items-center gap-3 text-sm text-slate-400 transition hover:text-steel-300"
              >
                <Phone className="h-4 w-4" /> {profile.social.phone}
              </a>
              <button
                onClick={downloadCv}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-steel-500 to-steel-700 px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:from-steel-400 hover:to-steel-600"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            <Github className="h-4 w-4" /> Designed & engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
