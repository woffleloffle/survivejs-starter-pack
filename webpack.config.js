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
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
      include: PATHS.app
    }, {
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

const prod = {}

// Export different configs per env
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, dev)
}

if (TARGET === 'build') {
  module.exports = merge(common, prod)
}
//Extract any CSS files
var SourceMapSource = require("webpack-sources").SourceMapSource;
var RawSource = require("webpack-sources").RawSource;

function ExtractModule(identifier, originalModule, source, sourceMap, addtitionalInformation, prevModules) {
	this._identifier = identifier;
	this._originalModule = originalModule;
	this._source = source;
	this._sourceMap = sourceMap;
	this._prevModules = prevModules;
	this.addtitionalInformation = addtitionalInformation;
	this.chunks = [];
}
module.exports = ExtractModule;

ExtractModule.prototype.getOrder = function() {
	// http://stackoverflow.com/a/14676665/1458162
	return /^@import url/.test(this._source) ? 0 : 1;
};

ExtractModule.prototype.addChunk = function(chunk) {
	var idx = this.chunks.indexOf(chunk);
	if(idx < 0)
		this.chunks.push(chunk);
};

ExtractModule.prototype._removeAndDo = require("webpack/lib/removeAndDo");

ExtractModule.prototype.removeChunk = function(chunk) {
	return this._removeAndDo("chunks", chunk, "removeModule");
};

ExtractModule.prototype.rewriteChunkInReasons = function(oldChunk, newChunks) { };

ExtractModule.prototype.identifier = function() {
	return this._identifier;
};

ExtractModule.prototype.source = function() {
	if(this._sourceMap)
		return new SourceMapSource(this._source, null, this._sourceMap);
	else
		return new RawSource(this._source);
};

ExtractModule.prototype.getOriginalModule = function() {
	return this._originalModule;
};

ExtractModule.prototype.getPrevModules = function() {
	return this._prevModules;
};

ExtractModule.prototype.addPrevModules = function(prevModules) {
	prevModules.forEach(function(m) {
		if(this._prevModules.indexOf(m) < 0)
			this._prevModules.push(m);
	}, this);
};

ExtractModule.prototype.setOriginalModule = function(originalModule) {
	this._originalModule = originalModule;
};
