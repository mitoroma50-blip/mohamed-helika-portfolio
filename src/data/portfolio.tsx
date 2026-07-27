import {
  Solidworks,
  Ansys,
  Fusion,
  NTopology,

  MicrosoftOffice,
  FeaIcon,
  TopologyIcon,
} from '@/components/icons/SkillIcons';

export const profile = {
  name: 'Mohamed Ahmed Helika',
  title: 'Production & Mechanical Design Engineer',
  subtitle:
    'Mechanical Design | CAD | FEA | Topology Optimization | Additive Manufacturing',
  tagline:
    'Engineering precision into every component — from concept to optimized, simulation-verified design.',
  location: 'Port Said, Egypt',
  social: {
    linkedin: 'https://www.linkedin.com/in/mohamed-helika-615814366',
    email: 'mitoroma50@gmail.com',
    phone: '+201277317411',
    phoneHref: 'tel:+201277317411',
  },
};

export type NavItem = { label: string; href: string };
export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Project', href: '#project' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  type: 'education' | 'internship';
  description: string;
  highlights: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: '2021 — 2026',
    title: 'B.Sc. Production & Mechanical Design Engineering',
    org: 'Port Said University',
    type: 'education',
    description:
      'Comprehensive study of mechanical design, manufacturing processes, solid mechanics and computational engineering tools.',
    highlights: [
      'CAD / CAE modelling and simulation',
      'Machine design & solid mechanics',
      'Additive manufacturing & topology optimization',
      'Production systems & quality control',
    ],
  },
  {
    period: 'Summer 2025',
    title: 'Mechanical Engineering Intern',
    org: 'Petrobel (Petrobel Company)',
    type: 'internship',
    description:
      'Hands-on exposure to rotating equipment, piping systems and maintenance workflows in an operating oil & gas facility.',
    highlights: [
      'Rotating equipment inspection',
      'Preventive & corrective maintenance',
      'Petrobel HSE & operations standards',
    ],
  },
  {
    period: 'Summer 2024',
    title: 'Engineering Intern',
    org: 'Mechanical & Electrical Authority',
    type: 'internship',
    description:
      'Field experience with large-scale mechanical and electrical infrastructure systems and utility operations.',
    highlights: [
      'Utility & infrastructure systems',
      'Mechanical-electrical integration',
      'Maintenance planning & documentation',
    ],
  },
];

export type Skill = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
};

export const skills: Skill[] = [
  {
    name: 'SolidWorks',
    description: 'Parametric 3D CAD, assemblies, sheet metal and detailed drawings.',
    icon: Solidworks,
    accent: 'from-red-500/20 to-orange-500/10',
  },
  {
    name: 'ANSYS',
    description: 'Finite element analysis — structural, thermal and modal simulation.',
    icon: Ansys,
    accent: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'Fusion 360',
    description: 'Cloud CAD/CAM, generative design and integrated manufacturing.',
    icon: Fusion,
    accent: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'nTopology',
    description: 'Implicit modeling, lattice structures and advanced topology workflows.',
    icon: NTopology,
    accent: 'from-blue-500/20 to-indigo-500/10',
  },
  {
  name: 'Python',
  description: 'Engineering scripting, data analysis and automation for mechanical applications.',
  icon: FeaIcon,
  accent: 'from-green-500/20 to-emerald-500/10',
},
  {
    name: 'Microsoft Office',
    description: 'Reports, technical documentation and project presentations.',
    icon: MicrosoftOffice,
    accent: 'from-blue-500/20 to-sky-500/10',
  },
  {
    name: 'Finite Element Analysis',
    description: 'Stress, strain and failure analysis for validated, reliable designs.',
    icon: FeaIcon,
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    name: 'Topology Optimization',
    description: 'Lightweighting and performance-driven structural design.',
    icon: TopologyIcon,
    accent: 'from-cyan-500/20 to-blue-500/10',
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

export const featuredProject = {
  title: 'Universal Joint Topology Optimization',
  subtitle: 'Lightweighting a universal joint through simulation-driven design',
  overview:
    'A complete simulation-driven redesign of a universal joint. The workflow moved from a baseline CAD model through topology optimization in nTopology, structural validation in ANSYS, and a final additively-manufacturable geometry — achieving significant mass reduction while preserving load capacity.',
  stats: [
    { label: 'Mass Reduction', value: '−34%' },
    { label: 'Peak Stress', value: '< Yield' },
    { label: 'Load Case', value: 'Torque + Bending' },
    { label: 'Method', value: 'Topology + FEA' },
  ],
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image: string;
};
