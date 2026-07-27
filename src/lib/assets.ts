import manifest from 'virtual:asset-manifest';
import type {
  Certificate,
  GalleryImage,
} from '@/data/portfolio';

// ---- CV -------------------------------------------------------------

export const CV_URL = manifest.cv.url;

// ---- Profile portrait ----------------------------------------------

export const PROFILE_IMAGE = manifest.profile.image;
// ---- Certificates ---------------------------------------------------

const CERT_META: Record<string, { title: string; issuer: string; year: string }> = {
  'cert-1': {
    title: 'Summer Training Certificate',
    issuer: 'PETROBEL (Belayim Petroleum Company)',
    year: '2025',
  },
  'cert-2': {
    title: 'SolidWorks Engineering Design',
    issuer: 'Information Technology Institute (ITI)',
    year: '',
  },
  'cert-3': {
    title: 'Mechanical Pumping Stations Training',
    issuer: 'General Administration for Pumping Stations',
    year: '2025',
  },
};

const FALLBACK_CERT: Certificate = {
  title: 'Certificate',
  issuer: 'Add an image to /public/assets/certificates/',
  year: '—',
  image: '',
};

export function getCertificates(): Certificate[] {
  console.log(manifest.certificates);

  if (manifest.certificates.length === 0) return [];

  return manifest.certificates.map((f) => {
    const meta = CERT_META[f.name] ?? {
      title: prettify(f.name),
      issuer: 'Issuer',
      year: '',
    };

    return {
      ...meta,
      image: f.url,
    };
  });
}

// ---- Project gallery ------------------------------------------------

// Maps a project image filename (without extension) to its caption + tag.
const PROJECT_META: Record<string, { caption: string; tag: string; alt: string }> = {
  'project-1': {
    caption: 'Baseline CAD Model',
    tag: 'CAD',
    alt: 'CAD model of the universal joint assembly',
  },
  'project-2': {
    caption: 'Topology Optimization Iteration',
    tag: 'Topology',
    alt: 'Topology optimization result with organic lattice structure',
  },
  'project-3': {
    caption: 'ANSYS Structural Simulation',
    tag: 'Simulation',
    alt: 'ANSYS stress simulation contour plot',
  },
  'project-4': {
    caption: 'Final Optimized Design',
    tag: 'Final',
    alt: 'Final optimized universal joint design ready for additive manufacturing',
  },
};

const FALLBACK_PROJECT_GALLERY: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/3823991/pexels-photo-3823991.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'CAD model of the universal joint assembly',
    caption: 'Baseline CAD Model',
    tag: 'CAD',
  },
  {
    src: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Topology optimization result with organic lattice structure',
    caption: 'Topology Optimization Iteration',
    tag: 'Topology',
  },
  {
    src: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'ANSYS stress simulation contour plot',
    caption: 'ANSYS Structural Simulation',
    tag: 'Simulation',
  },
  {
    src: 'https://images.pexels.com/photos/8438970/pexels-photo-8438970.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Final optimized universal joint design ready for additive manufacturing',
    caption: 'Final Optimized Design',
    tag: 'Final',
  },
];

export function getProjectGallery(): GalleryImage[] {
  if (manifest.projects.length === 0) return FALLBACK_PROJECT_GALLERY;
  return manifest.projects.map((f) => {
    const meta = PROJECT_META[f.name] ?? {
      caption: prettify(f.name),
      tag: 'Project',
      alt: f.name,
    };
    return { src: f.url, alt: meta.alt, caption: meta.caption, tag: meta.tag };
  });
}

function prettify(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export { FALLBACK_CERT };
