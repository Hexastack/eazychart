import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
// import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    { file: 'dist/eazychart.cjs.js', format: 'cjs' },
    { file: 'dist/eazychart.esm.js', format: 'es' },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
    }),
    babel(),
  ],
};
