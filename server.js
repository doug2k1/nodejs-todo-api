'use strict';

const bodyParser = require('body-parser');
const db = require('./db.js');
const _ = require('lodash');
const app = require('express')();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Todo API root');
});

// POST /todos
app.post('/todos', (req, res) => {
	const body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then((todo) => {
		res.json(todo.toJSON());
	}, (e) => {
		res.status(400).json(e);
	});
});

// GET /todos
app.get('/todos', (req, res) => {
	db.todo.findAll().then((todos) => {
		res.json(todos);
	}, (e) => {
		res.status(500).send();
	});
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
	const todoId = parseInt(req.params.id, 10);

	db.todo.findById(todoId).then((todo) => {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, (e) => {
		res.status(500).send();
	});
});

db.sequelize.sync(/*{ force: true }*/).then(() => {
    app.listen(PORT, () => {
        console.log('Express listening on port ' + PORT + '!');
    });
});
