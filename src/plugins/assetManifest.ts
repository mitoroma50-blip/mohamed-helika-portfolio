import type { Plugin } from 'vite';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative, extname, basename } from 'node:path';

const ASSETS_ROOT = resolve('public/assets');

const VIRTUAL_ID = 'virtual:asset-manifest';
const RESOLVED_ID = '\0virtual:asset-manifest';

const BASE_PATH = '/mohamed-helika-portfolio';

const IMAGE_EXT = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
  '.svg',
];

type AssetFile = {
  url: string;
  name: string;
  ext: string;
};

type AssetManifest = {
  profile: {
    image: string | null;
  };
  cv: {
    url: string | null;
  };
  certificates: AssetFile[];
  projects: AssetFile[];
};


function listImages(dir: string): AssetFile[] {
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) =>
      IMAGE_EXT.includes(extname(f).toLowerCase())
    )
    .filter((f) =>
      statSync(join(dir, f)).isFile()
    )
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    )
    .map((f) => {

      const full = join(dir, f);

      const rel = relative(
        ASSETS_ROOT,
        full
      )
        .split('\\')
        .join('/');

      const mtime = statSync(full).mtimeMs;

      return {
        url: `${BASE_PATH}/assets/${rel}?v=${Math.floor(mtime)}`,
        name: basename(
          f,
          extname(f)
        ),
        ext: extname(f)
          .slice(1)
          .toLowerCase(),
      };
    });
}



function findProfileImage(dir: string): string | null {

  if (!existsSync(dir)) return null;

  const hit = readdirSync(dir).find(
    (f) =>
      extname(f).toLowerCase() === '.jpg' &&
      basename(
        f,
        extname(f)
      ).toLowerCase() === 'profile'
  );

  if (!hit) return null;

  const mtime = statSync(
    join(dir, hit)
  ).mtimeMs;

  return `${BASE_PATH}/assets/profile/${hit}?v=${Math.floor(mtime)}`;
}




function findCv(dir: string): string | null {

  if (!existsSync(dir)) return null;

  const hit = readdirSync(dir).find(
    (f) =>
      f.toLowerCase() === 'cv.pdf'
  );

  if (!hit) return null;

  const mtime = statSync(
    join(dir, hit)
  ).mtimeMs;

  return `${BASE_PATH}/assets/cv/${hit}?v=${Math.floor(mtime)}`;
}




function buildManifest(): AssetManifest {

  return {

    profile: {
      image: findProfileImage(
        resolve(
          ASSETS_ROOT,
          'profile'
        )
      ),
    },


    cv: {
      url: findCv(
        resolve(
          ASSETS_ROOT,
          'cv'
        )
      ),
    },


    certificates: listImages(
      resolve(
        ASSETS_ROOT,
        'certificates'
      )
    ),


    projects: listImages(
      resolve(
        ASSETS_ROOT,
        'projects'
      )
    ),

  };

}





export function assetManifestPlugin(): Plugin {

  return {

    name: 'asset-manifest',

    enforce: 'pre',


    resolveId(id) {

      if (id === VIRTUAL_ID)
        return RESOLVED_ID;

    },


    load(id) {

      if (id !== RESOLVED_ID)
        return;


      const manifest = buildManifest();


      return `export default ${JSON.stringify(
        manifest,
        null,
        2
      )};`;

    },



    configureServer(server) {

      server.watcher.on(
        'all',
        (_event, file) => {

          if (!file.includes('/public/assets/'))
            return;


          const mod =
            server.moduleGraph.getModuleById(
              RESOLVED_ID
            );


          if (mod) {

            server.moduleGraph.invalidateModule(mod);

            server.ws.send({
              type: 'full-reload',
            });

          }

        }
      );

    },

  };

}