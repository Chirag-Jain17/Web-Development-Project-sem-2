const express = require('express');
const app = express();

console.log(__dirname);

app.post('/register', function(req,res) {
    res.send('User registered');
})

app.listen("5500");