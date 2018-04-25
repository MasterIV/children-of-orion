const path = require('path');

module.exports = {
	entry: './jsx/index.jsx',
	watch: true,
	mode: 'development',
	module: { rules: [
		{
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}
	]},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'js')
	}
};
