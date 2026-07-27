import {
  Box,
  Hexagon,
  Cuboid,
  CircuitBoard,
  PenTool,
  FileText,
  Gauge,
  Layers,
} from 'lucide-react';

// Brand-neutral icons representing each engineering tool / skill.
// We avoid embedding third-party logos; these are tasteful, consistent glyphs.

export const Solidworks = (props: { className?: string }) => (
  <Box {...props} />
);
export const Ansys = (props: { className?: string }) => (
  <Gauge {...props} />
);
export const Fusion = (props: { className?: string }) => (
  <Cuboid {...props} />
);
export const NTopology = (props: { className?: string }) => (
  <Hexagon {...props} />
);
export const AutoCAD = (props: { className?: string }) => (
  <PenTool {...props} />
);
export const MicrosoftOffice = (props: { className?: string }) => (
  <FileText {...props} />
);
export const FeaIcon = (props: { className?: string }) => (
  <CircuitBoard {...props} />
);
export const TopologyIcon = (props: { className?: string }) => (
  <Layers {...props} />
);
