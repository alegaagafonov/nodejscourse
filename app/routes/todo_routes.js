const { ObjectId } = require('mongodb');

module.exports = function(app, client) {
    app.get('/todos', (req, res) => {

        const db = client.db('todos_db');
        db.collection("todos").find({}).toArray((err, todos) => {
            console.log('todos', todos);
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('ok');
            }
        });
    });

    app.post('/todos', (req, res) => {
        const todo = { label: req.body.label, done: req.body.done };

        const db = client.db('todos_db');
        db.collection('todos').insertOne(todo, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('ok');
            }
        });
    });

    app.put('/todos/:id', (req, res) => {
        const id = req.params.id;

        const db = client.db('todos_db');
        db.collection('todos').updateOne(
            { '_id': new ObjectId(id) }, {$set: {"label": req.body.label}}, (err) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('ok');
            }
        });
    });

    app.put('/todos/:id/complete', (req, res) => {
        const id = req.params.id;

        const db = client.db('todos_db');
        db.collection('todos').updateOne(
            { '_id': new ObjectId(id) }, {$set: {"done": true}}, (err) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send('ok');
                }
            });
    });

    app.put('/todos/:id/uncomplete', (req, res) => {
        const id = req.params.id;

        const db = client.db('todos_db');
        db.collection('todos').updateOne(
            { '_id': new ObjectId(id) }, {$set: {"done": false}}, (err) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send('ok');
                }
            });
    });

    app.delete('/todos/:id', (req, res) => {
        const id = req.params.id;

        const db = client.db('todos_db');
        db.collection('todos').remove({ '_id': new ObjectId(id) }, (err) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Todo with ' + id + ' id is deleted!');
            }
        });
    });
};
