const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const app = express();
app.use(bodyParser.json());

let db, collection;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        // Selecciona (o crea) la base de datos 'miBaseDeDatos'
        db = client.db('miBaseDeDatos');

        // Selecciona (o crea) la colección 'miColeccion'
        collection = db.collection('miColeccion');

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

app.post('/insert', async (req, res) => {
    try {
        const nuevoDocumento = req.body;
        const resultado = await collection.insertOne(nuevoDocumento);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send('Error al insertar documento: ' + error);
    }
});

app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
    connectToDatabase();
});