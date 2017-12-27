const express = require('express');
const app = express();
const pdf = require('./pdf');
const db = require('./db');

db.initDB();

app.get('/user/:firstName', function(req, res) {
    const firstName = req.params.firstName;
    db.doQuery('select * from user where firstName = ?',[firstName]).then((data) => {
        if (data[0]) {
            pdf.createPdf(data[0]).then((pdf) => {
                db.doQuery('UPDATE user SET pdf = ? WHERE firstName = ?',[pdf, firstName])
                    .then(() => {
                        res.type('json');
                        res.send({ result: true });
                    });
            });
        }
        else {
            res.type('json');
            res.send({ result: false });
        }
    });
});

app.listen(4400);
