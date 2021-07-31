const path = require('path');

module.exports = {
	webpackDevMiddleware: (config) => {
		config.watchOptions.poll = 300;
		return config;
	},
	env: {
		SERVER_API: process.env.SERVER_API,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'style')],
	},
};
