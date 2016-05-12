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
var typeid = 2;
var INSERT_ARCHIVES = "INSERT INTO dede_archives SET ?";
var INSERT_ARTICLE_BODY = "INSERT INTO dede_addonarticle SET ?";
var archive = {
    title: 'testitlte',
    typeid: typeid,
    keywords: 'keykeykey',
    description: 'desc'
};

connection.query(INSERT_ARCHIVES, archive, function (err, rows, fields) {
    if (err) throw err;

    if (rows.affectedRows > 0) {
        console.log('insert dede_archives success! id=' + rows.insertId);
        var article = {
            aid: rows.insertId,
            typeid: typeid,
            body: 'bodybodycontent'
        };
        connection.query(INSERT_ARTICLE_BODY, article, function (err, res) {
            if (err) throw err;
            if (res.affectedRows > 0) {
                console.log('insert dede_addonarticle success! aid=' + rows.insertId);
            }
            connection.end();
        });
    }

});

