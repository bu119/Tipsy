const path = require("path");
const webpack = require("webpack");
// const dotenv = require("dotenv");
// const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "eval-source-map",
	// devtool: "eval",
	entry: "./src/index.js", //do we need this?
	output: {
		path: path.resolve("dist"),
		filename: "index_bundle.js",
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				// css-loader로 css를 불러와 style-loader로 style 태그로 만들어서 <head>에 넣어준다.
				use: ['style-loader', 'css-loader'], // 뒤(css-loader)부터 실행된다.
				// css-loader와 style-loader를 순서대로 실행한 후 <head>에 style을 자동으로 넣어준다.
			},
			{	// 리액트 바벨 설정
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				},
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: "raw-loader",
			},
			{
				test: /\.(gif|png|jpe?g|svg|xml)$/i,
				use: "file-loader",
			},
			{
				test: /\.jfif$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
		],
	},
	plugins: [
		// new Dotenv({
		// 	path: envPath,
		// }),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: 'public/index.html', // 템플릿 설정
			// favicon: 'public/favicon.ico', // 파비콘 (전에 프로젝트 파비콘이 적용됨..;;)
			filename: "index.html",
			minify: true, // 압축 설정
			// inject: "body",
		}),
		new FaviconsWebpackPlugin({
			logo: 'public/favicon.ico',
		}),
		new webpack.ProvidePlugin({ // 리액트 자동 로드
			"React": "react",
	}),
	],
};
