const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.use(express.static('.'));

app.use(bodyParser.json())

app.get('/catalog', (req, res) => {
    fs.readFile('database/database.json', 'utf-8', ((err, data) => {
        res.send(data);
    }))
});

app.get('/cart', (req, res) => {
    fs.readFile('database/cart.json', 'utf-8', ((err, data) => {
        res.send(data);
    }))
});

app.post('/cart', (req, res) => {
    fs.readFile('database/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        console.log(item)
        console.log(cart)
        cart.push(item);
        fs.writeFile('database/cart.json', JSON.stringify(cart), (err) => {
            console.log('done');
            res.send('ok')
        });
    });
});

