const mysql = require('mysql');
const fs = require('fs');

const con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "1234",
    database: "test"
});

con.connect();

function insert(firstName, lastName, img) {
    con.query(mysql.format('INSERT INTO user (firstName, lastName, img) VALUES (?, ?, ?)',
        [firstName, lastName, img]));
}

module.exports.initDB = function initDB() {
    con.query('drop table if exists user');
    con.query(`create table user ( 
                id integer auto_increment,
                firstName varchar(45) unique not null, 
                lastName varchar(45) not null, 
                img longblob not null,
                pdf longblob,
                primary key(id) 
                ); `);
    insert("f1","l1",fs.readFileSync("images/1.jpg"));
    insert("f2","l2",fs.readFileSync("images/1.png"));
};

module.exports.doQuery = function doQuery(query, params) {
    return new Promise((resolve) => {
        con.query(mysql.format(query, params), (err, data) => {
            resolve(data);
        });
    })

};