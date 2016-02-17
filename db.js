'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
let sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': `${__dirname}/data/dev-todo-api.sqlite`
	});
}

const db = {
	sequelize: sequelize,
	todo: sequelize.import(`${__dirname}/models/todo.js`)
};

module.exports = db;
