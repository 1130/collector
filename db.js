/**
 * Created by xiaochen on 2016/5/11.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'dedecmsv57utf8sp1'
});
connection.connect();
connection.query('SELECT * FROM dede_addonarticle limit 10', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function (d) {
        console.log(d.body);
        console.log('=================');
    });

});

connection.end();