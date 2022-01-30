const express = require('express');
const config = require('./config')
const { Client } = require('pg')


const port = config.port
const app = express();
app.use(express.json());

const client = new Client({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.dbPort,
    database: config.database,
})
client.connect();


app.get('/posts', (request, response) => {

    client.query(`SELECT * FROM "postsApp"`, (err, res) => {
        if (!err) {
            response.json(res.rows)
        } else {
            response.json(err.message)
        }
    })

})

app.get('/postsReverse', (request, response) => {

    client.query(`SELECT * FROM "postsApp" ORDER BY id DESC LIMIT 2`, (err, res) => {
        if (!err) {
            response.json(res.rows)
        } else {
            response.json(err.message)
        }
    })

})

app.get('/posts/limit/:lim', (request, response) => {

    client.query(`SELECT * FROM "postsApp" ORDER BY id DESC LIMIT $1`, [request.params.lim], (err, res) => {
        if (!err) {
            response.json(res.rows)
        } else {
            response.json(err.message)
        }
    })

})

app.get('/posts/:id', (request, response) => {

    client.query(`SELECT * FROM "postsApp" WHERE id = $1`, [request.params.id], (err, res) => {
        if (!err) {
            response.json(res.rows[0])
        } else {
            response.json(err.message)
        }
    })

})

app.get('/', (req, res) => {
    res.json("попробуйте другой роут, здесь данных нет")
})

app.listen(
    port,
    () => { console.log("server started on port " + port) }
);