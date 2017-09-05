var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./config/helpers');
var path = require('path');

var config = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts'
	},
	output: {
		path: helpers.root('public'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.ts$/,
			use: ['awesome-typescript-loader', 'angular2-template-loader']
		}, {
			test: /\.html/,
			loader: 'raw-loader'
		}, { // Load sass files from the theme folder only then convert to css and bundle them
			test: /\.scss$/,
			include: helpers.root('src/theme'),
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?postcss-loader!sass-loader!resolve-url-loader!sass-loader'
			})
		}, { // Load sass files from within the application folder then convert to a string, then css and include in the javascript module
			test: /\.scss$/,
			include: helpers.root('src', 'app'),
			loader: 'raw-loader!sass-loader!postcss-loader'
		}, {
			test: /\.css$/,
			exclude: helpers.root('src', 'app'),
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?sourceMap'
			})
		}, {
			test: /bootstrap\/dist\/js\/umd\//,
			loader: 'imports-loader?jQuery=jquery'
		}]
	},

	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills'],
			minChunks: Infinity
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery/dist/jquery.min',
			$: 'jquery/dist/jquery.min',
			jquery: 'jquery/dist/jquery.min'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.ejs'
		}),
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(__dirname, '../src')
		)
	],

	resolve: {
		extensions: ['.ts', '.js']
	},
	devtool: 'source-map'
};
module.exports = config;