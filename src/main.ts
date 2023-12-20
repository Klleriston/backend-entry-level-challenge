import express, {Request ,Response } from 'express';
import * as mysql from 'mysql';

const app = express()
const port = 3006;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'API_PRONTUARIO'
});

db.connect((err) => {
    if (err) {
        console.error('Error to connect in database ', err);
    }
    console.log('Successful connection to the database !');
});

app.listen(port, () => {
    console.log(`Online server at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.status(200).send('Testado com sucesso tomele pai é genio !');
})