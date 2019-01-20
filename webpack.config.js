// customized from https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
// TODO: babel polyfills or runtime
// TODO: server setup

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dev = process.env.NODE_ENV === 'development'
const publicPath = '/'
const buildDir = path.resolve('build')
const srcDir = path.resolve('src')
const staticDir = path.resolve('static')

function formatWindowsUri(path) {
  return path.replace(/\\/g, '/')
}

module.exports = /** @type {import('webpack').Configuration} */ ({
  entry: [path.resolve(srcDir, 'globals.css'), path.resolve(srcDir, 'index.tsx')],
  output: {
    path: buildDir,
    // filename is the template for entry points
    // chunk is the template for generated (split) assets from the entry point
    // they don't really have any meaningful differences for consumers, as long as their names don't collide
    filename: dev ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
    chunkFilename: dev ? 'js/[name].chunk.js' : 'js/[name].[chunkhash:6].chunk.js',
    publicPath,
    // useful comments in dev mode about where the module was located
    pathinfo: dev,
    // the template generator for sourcemapped files' paths in browser dev tools
    devtoolModuleFilenameTemplate(info) {
      return formatWindowsUri(path.relative(srcDir, info.absoluteResourcePath))
    },
  },
  mode: dev ? 'development' : 'production',
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    modules: ['node_modules', srcDir],
  },
  module: {
    // makes missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.[tj]sx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // ignore .babelrc and babel.config.js
                  babelrc: false,
                  configFile: false,
                  // emit source maps
                  sourceMaps: true,
                  // creates a cache directory (babel-laoder ONLY)
                  cacheDirectory: true,
                  // minify and cache the minification step in PROD
                  compact: !dev,
                  cacheCompression: !dev,
                  presets: [
                    '@babel/preset-react',
                    [
                      '@babel/preset-env',
                      {
                        loose: true,
                        modules: false,
                        targets: {
                          chrome: 69,
                          safari: 12,
                          firefox: 57,
                        },
                      },
                    ],
                    '@babel/preset-typescript',
                    '@emotion/babel-preset-css-prop',
                  ],
                  plugins: [
                    // decorators have to come before class proeprties
                    [
                      '@babel/plugin-proposal-decorators',
                      // @decorate  | INSTEAD OF:
                      // export foo | export @decorate foo
                      {
                        decoratorsBeforeExport: true,
                      },
                    ],
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-throw-expressions',
                  ],
                },
              },
            ],
          },
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              'postcss-loader',
            ],
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:6].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new (require('html-webpack-plugin'))({
      template: path.resolve(staticDir, 'index.html'),
      // injects generated assets into head and body for css and js assets, respectively
      inject: true,
      // taken from CRA's config
      minify: !dev && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // see base output config
    new MiniCssExtractPlugin({
      filename: dev ? 'css/[name].css' : 'css/[name].[contenthash:6].css',
      chunkFilename: dev ? 'css/[name].chunk.css' : 'css/[name].[contenthash:6].chunk.css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
    }),
    // creates a map of generated assets with their filenames
    new (require('webpack-manifest-plugin'))({
      fileName: 'asset-manifest.json',
      publicPath,
    }),
    // copies the static dir without index.html
    new (require('copy-webpack-plugin'))([
      {
        from: staticDir,
        to: path.resolve(buildDir, 'static'),
        ignore: 'index.html',
      },
    ]),
  ],
  optimization: {
    minimize: !dev,
    minimizer: [
      // terser supports > ES5 syntax
      new (require('terser-webpack-plugin'))({
        terserOptions: {
          // parse ecma 8 and compress/output ecma 5 means that it parses es8
          // but only minifies es5 code it does NOT transpile down to es5
          parse: { ecma: 8 },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: { safari10: true },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new (require('optimize-css-assets-webpack-plugin'))({
        cssProcessorOptions: {
          // allows parsing "invalid" CSS syntax
          parser: require('postcss-safe-parser'),
          map: {
            // equivalent to having a separate .map file and having a comment URL pointing to the .map file
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
    // considers everything to be splittable, including synchronous imports from entry point graphs
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // splits the runtime into its own chunk
    runtimeChunk: true,
  },
  devServer: {
    // dev server serves what is outputted into the build directory
    // it still stores everything in memory though
    contentBase: buildDir,
  },
  // always use source-map to allow CSS source maps in dev mode
  devtool: 'source-map',
  performance: false,
})
