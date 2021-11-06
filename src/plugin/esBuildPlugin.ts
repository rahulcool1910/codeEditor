import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

export const unpkgPathPlugin = (contents: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents,
          };
        }
        const cachedData = await localforage.getItem<esbuild.OnLoadResult>(
          args.path
        );
          if (cachedData) {
             return cachedData;
          }
        const { data, request } = await axios.get(args.path);
        const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        // console.log(escaped);

        contents =
          loader === 'css'
            ? `const style=document.createElement('style');
            style.innerText='${escaped}'
            document.head.appendChild(style);
            `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        localforage.setItem(args.path, result);
        return result;
      });
    },
  };
};
