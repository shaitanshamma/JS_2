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
        let isInCart = false
        if (cart.length === 0) {
            cart.push(item)
        } else {
            for (let i = 0; i <cart.length; i++) {
                let key = cart[i].id
                if (key === item.id) {
                    cart[i].quant += 1
                    console.log(item, 'good')
                    isInCart = true
                }
            }
            if (!isInCart) {
                cart.push(item);
            }
        }

        fs.writeFile('database/cart.json', JSON.stringify(cart), (err) => {
            console.log('product add to cart');
            res.send('ok')
        });
    });
});

app.post('/log', (req, res) => {
    fs.readFile('database/log.json', 'utf8', (err, data) => {
        const log = JSON.parse(data);
        const log_item = req.body;
        log_item.time = moment().format('MMMM Do YYYY, h:mm:ss a')
        log.push(log_item);
        fs.writeFile('database/log.json', JSON.stringify(log), (err) => {
            console.log('log event');
            res.send('ok')
        });
    });
});

app.delete('/cart/:id', (req, res) => {
    fs.readFile('database/cart.json', 'utf8', (err, data) => {
        let cart = JSON.parse(data);
        const id = req.params.id
        cart = cart.filter(p => p.id !== +id)

        fs.writeFile('database/cart.json', JSON.stringify(cart), (err) => {
            console.log('product remove from cart');
            res.send('ok')
        });
    });
});