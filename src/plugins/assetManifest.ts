import type { Plugin } from 'vite';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS_ROOT = resolve('public/assets');
const VIRTUAL_ID = 'virtual:asset-manifest';
const RESOLVED_ID = '\0virtual:asset-manifest';

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

type AssetFile = {
  /** web-root path with cache-bust query, e.g. /assets/certificates/cert-1.png?v=1717 */
  url: string;
  /** filename without extension, e.g. cert-1 */
  name: string;
  /** file extension without dot, e.g. png */
  ext: string;
};

type AssetManifest = {
  profile: { image: string | null };
  cv: { url: string | null };
  certificates: AssetFile[];
  projects: AssetFile[];
};

function emptyManifest(): AssetManifest {
  return { profile: { image: null }, cv: { url: null }, certificates: [], projects: [] };
}

function listImages(dir: string): AssetFile[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.includes(extname(f).toLowerCase()))
    .filter((f) => statSync(join(dir, f)).isFile())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => {
      const full = join(dir, f);
      const rel = relative(ASSETS_ROOT, full).split('\\').join('/');
      const mtime = statSync(full).mtimeMs;
      return {
        url: `/assets/${rel}?v=${Math.floor(mtime)}`,
        name: basename(f, extname(f)),
        ext: extname(f).slice(1).toLowerCase(),
      };
    });
}

function findProfileImage(dir: string): string | null {
  if (!existsSync(dir)) return null;
  const hit = readdirSync(dir).find(
    (f) => extname(f).toLowerCase() === '.jpg' && basename(f, extname(f)).toLowerCase() === 'profile'
  );
  if (!hit) return null;
  const mtime = statSync(join(dir, hit)).mtimeMs;
  return `/assets/profile/${hit}?v=${Math.floor(mtime)}`;
}

function findCv(dir: string): string | null {
  if (!existsSync(dir)) return null;
  const hit = readdirSync(dir).find((f) => f.toLowerCase() === 'cv.pdf');
  if (!hit) return null;
  const mtime = statSync(join(dir, hit)).mtimeMs;
  return `/assets/cv/${hit}?v=${Math.floor(mtime)}`;
}

function buildManifest(): AssetManifest {
  return {
    profile: { image: findProfileImage(resolve(ASSETS_ROOT, 'profile')) },
    cv: { url: findCv(resolve(ASSETS_ROOT, 'cv')) },
    certificates: listImages(resolve(ASSETS_ROOT, 'certificates')),
    projects: listImages(resolve(ASSETS_ROOT, 'projects')),
  };
}

/**
 * Vite plugin: scans /public/assets/{profile,certificates,projects,cv} and
 * exposes a virtual module `virtual:asset-manifest` with the discovered files.
 * Re-scans on every request during dev so dropped-in files appear instantly.
 */
export function assetManifestPlugin(): Plugin {
  let cached: AssetManifest | null = null;

  function read(): AssetManifest {
    // Always re-scan in dev so newly added files show up without a restart.
    cached = buildManifest();
    return cached;
  }

  return {
    name: 'asset-manifest',
    enforce: 'pre',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const manifest = read();
      return `export default ${JSON.stringify(manifest, null, 2)};`;
    },
    configureServer(server) {
      // Invalidate the virtual module when files change under /public/assets.
      server.watcher.on('all', (event, file) => {
        if (!file.includes('/public/assets/')) return;
        cached = null;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

// Silence the unused-import warning for fileURLToPath if tree-shaken.
void fileURLToPath;
