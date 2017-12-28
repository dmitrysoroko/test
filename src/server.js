const express = require('express');
const app = express();
const pdf = require('./pdf');
const db = require('./db');

db.initDB();

app.get('/user/:firstName', function(req, res) {
    res.type('json');
    const firstName = req.params.firstName;
    const select = 'select * from user where firstName = ?';
    const update = 'UPDATE user SET pdf = ? WHERE firstName = ?';
    db.doQuery(select,[firstName])
        .then(data => pdf.createPdf(data))
        .then(pdf => db.doQuery(update, [pdf, firstName]))
        .then(() => res.send({result: true}))
        .catch(() => res.send({result: false}));
});

app.listen(4500);
