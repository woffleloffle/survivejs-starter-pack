const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const precss = require('precss');
const stylelint = require('stylelint')
const autoprefixer = require('autoprefixer');
const configSuitCSS = require('stylelint-config-suitcss')

// Grab the var from the NPC CLI ::-> npm *start* / npm run *build*
const TARGET = process.env.npm_lifecycle_event

// Map Babel's environment to our target
process.env.BABEL_ENV = TARGET;

var ExtractTextPlugin = require('extract-text-webpack-plugin');


// Auto-install webpack dependencies
const NpmInstallPlugin = require('npm-install-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const FILES = {
  eslintrc: path.join(__dirname, '.eslintrc')
}

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [{
      test: /\.css$/,
      loaders: ['postcss?pack=lint'], // Lint the styles before they get loaded.
      include: PATHS.app
    }, {
      test: /\.jsx?$/,
      loaders: ['eslint', 'jscs'],
      include: PATHS.app
    }],
    loaders: [
      {
      test: /\.jsx?$/,
      loaders: ['babel'],
      cacheDirectory: true,
      include: PATHS.app
    }]
  },
  eslint: {
    configFile: FILES.eslintrc,
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
      return {
        lint: [stylelint(configSuitCSS)],
        defaults: [autoprefixer, precss]
      }
  }
}

const dev = {
  devServer: {
    contentBase: PATHS.build,

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // JS Source Maps - just in dev.
    devtool: 'eval-source-map',

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      save: true // Install with `--save` flag
    })
  ]
}

const prod = {
  output: {

  },
  module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.app
        }
      ]
  },
  plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
  ]
  }


// Export different configs per env
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, dev);
  //got me there with the closing semi-columns in the merge function...lol
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, prod);
}
