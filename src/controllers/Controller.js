const { querys } = require('../database/querys');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

let db = require('../routes/config');
var sql = require("mssql");
var { response } = express;
var { Mensagem } = express;

app.post('/login', async (req, res) => {
    const pullTable = async () => {
        const pool = await sql.connect(db.db);

        const result = await pool
            .request()
            .input("login", req.query.login)
            .input("senha", req.query.password)
            .query(querys.getLogin);

        if (result.rowsAffected == 0) {
            res.send(JSON.stringify('error'));
        } else {

            const id_cliente = result.recordset[0].cliente_id_int;
            const resultNovi = await pool
                .request()
                .input("id_cliente", id_cliente)
                .query(querys.getNovidade);

            response.id = result.recordset[0].cliente_id_int;
            response.nome = result.recordset[0].nome;
            response.login = req.query.login;
            response.email = result.recordset[0].email;
            response.arr = resultNovi.recordset;
            res.send(response);

        }
    }
    pullTable();
});

app.get('/List', function (req, res) {

    res.send(response);

});

// Consulta de mensagens.
app.post('/Mensagem', function (req, res) {

    const Mensagens = async () => {
        const pool = await sql.connect(db.db);

        const resultMen = await pool
            .request()
            .input('idProcesso', req.query.id_processo)
            .query(querys.getMessagens);

        Mensagem = resultMen.recordset;
    }
    Mensagens();
});

// Get Mensagens
app.get('/Mensagens', function (req, res) {

    res.send(Mensagem);

});


let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando na porta 3000!');
});