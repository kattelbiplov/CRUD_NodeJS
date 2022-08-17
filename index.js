var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users'
});
conn.connect((err) => {
    if (!err) {
        console.log('database connected');
    } else {
        console.log('database not connected');
        console.log(err)
    }
})


app.get('/', (req, res) => {
    res.render('insert');
});

app.post('/insert', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `insert into userlist(name,email,password) values('${name}','${email}','${password}')`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('show');
    })
});

app.get('/show', (req, res) => {
    var sql = "select * from userlist";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('show', { userlist: results });
    })
});

app.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    var sql = `delete from userlist where id='${id}'`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/show');
        //alert('deleted');
    })
});

app.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    var sql = `select * from userlist where id='${id}'`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('edit', { userlist: results });
    })
});

app.post('/update/:id', (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `update userlist set name='${name}',email='${email}',password='${password}' where id='${id}'`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/show');

    })
})

app.listen(4000, () => {
    console.log('server is running')
})