/// <reference types="vite/client" />

declare module 'virtual:asset-manifest' {
  interface AssetFile {
    url: string;
    name: string;
    ext: string;
  }
  interface AssetManifest {
    profile: { image: string | null };
    cv: { url: string | null };
    certificates: AssetFile[];
    projects: AssetFile[];
  }
  const manifest: AssetManifest;
  export default manifest;
}
