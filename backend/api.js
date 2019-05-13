'use strict';

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
    Bucket: process.env.BUCKET,
    Key: 'food-carts',
};

let carts = [];

app.get('/', (req, res) => {
    s3.getObject(params, (err, data) => {
        if (err) console.log(err);
        carts = JSON.parse(data.Body);
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        res.send(JSON.stringify(carts));
    });
});

app.get('/search', (req, res) => {
    s3.getObject(params, (err, data) => {
        if (err) console.log(err);
        carts = JSON.parse(data.Body);
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        let search_term = req.query.q;
        let results = carts;
        if (search_term) {
            search_term = search_term.toLowerCase();
            results = carts.filter((cart) => {
                return cart.name.toLowerCase().includes(search_term) ||
                    cart.alias.includes(search_term) ||
                    check_categories(cart, search_term);
            });
        }
        let r = [];
        let skipped = 0;

        for (let i = 0; i < results.length; i++) {
            if (!results[i].name || !results[i].location.address1) {
                skipped += 1;
            } else {
                let cart = {
                    "name": results[i].name,
                    "address": results[i].location.address1,
                    "latitude": results[i].coordinates.latitude,
                    "longitude": results[i].coordinates.longitude,
                    "url": results[i].url
                };
                r.push(cart);
            }
        }
        res.send(JSON.stringify({
            "status": "success",
            "hits": results.length - skipped,
            "carts": r
        }));
    });
});

function check_categories(cart, keyword) {
    for (let i = 0; i < cart.categories.length; i++) {
        if (cart.categories[i].alias.includes(keyword)) {
            return true;
        }
    }
    return false;
}

module.exports.handler = serverless(app);
