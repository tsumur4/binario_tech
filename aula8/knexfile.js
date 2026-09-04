const path = require('path');

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, 'database.sqlite')
		},
		useNullAsDefault: true,
		migration: {
			directory: path.resolve(__dirname, 'src',
				'database', 'migrations')
		}
	}
};


