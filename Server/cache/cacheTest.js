const redis = require('redis'); // to improve reponse times, reducing load on database, store frequently accessed data in memory
const express = require('express');
const app = express();

const client = redis.createClient();

const checkCache = (req, res, next) => { // middleware function to check cache
    const { id } = req.params;
    client.get(id, (err, data) => {
        if(err) throw err;
        if(data !== null) { // if data exists in cache
            res.send(JSON.parse(data)); // serve data from cache
        }
        else next(); // proceed to next middleware
    })
}

//endpoint to fetch and cache data

app.get('/api/products/:id', checkCache, (req, res) => {
    const { id } = req.params;
    // Simulate fetching data from a database
    const product = {
        id,
        name: "Product " + id
    }
    // Store fetched data in the cache
    client.setEx(id, 3600, JSON.stringify(product)) // Expiry set to one hour
    res.send(product); // Serve data to the client
})
