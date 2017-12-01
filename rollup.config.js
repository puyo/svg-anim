// Rollup plugins
// import babel from 'rollup-plugin-babel'
// import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import typescript from 'rollup-plugin-typescript'

// PostCSS plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

export default {
  input: 'src/main.ts',
  output: {
    file: 'build/js/main.min.js',
    format: 'iife',
    name: 'SVGAnim',
    sourcemap: 'inline',
  },
  plugins: [
    typescript(),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
      ],
      extensions: [ '.css' ],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      namedExports: { 'debug': 'debug' },
    }),
    // eslint({
    //   exclude: [
    //     'src/styles/**',
    //   ]
    // }),
    // babel({
    //   exclude: 'node_modules/**',
    // }),


    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    (process.argv.indexOf('--live') !== -1 && serve('build')),
    (process.argv.indexOf('--live') !== -1 && livereload('build')),
  ],
}
