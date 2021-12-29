const express = require('express');
const api = require('./api');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get(`/api/user/:name`, async(req, res) => {
    const name = req.params.name;
    if (!name) {
        res.sendStatus(400);
        res.json({ message: "Bad Request" });
    }
    try {
        const response = await api.loadUser(name);
        res.send(response);
    } catch (err) {
        res.sendStatus(404);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}....`));