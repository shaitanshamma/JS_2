const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const moment = require('moment')

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

app.post('/log', (req, res) => {
    fs.readFile('database/log.json', 'utf8', (err, data) => {
        const log = JSON.parse(data);
        const log_item = req.body;
        log_item.time=moment().format('MMMM Do YYYY, h:mm:ss a')
        log.push(log_item);
        fs.writeFile('database/log.json', JSON.stringify(log), (err) => {
            console.log('done');
            res.send('ok')
        });
    });
});