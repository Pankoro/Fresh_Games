const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        // Selecciona (o crea) la base de datos 'User'
        const database = client.db('User');

        // Selecciona (o crea) la colección 'user'
        const collection = database.collection('user');

        // Define el documento a insertar
        const nuevoDocumento = {
            nombre: 'John',
            edad: 30,
            ciudad: 'Atlanta'
        };

        // Inserta el documento en la colección
        const resultado = await collection.insertOne(nuevoDocumento);
        console.log('Documento insertado con _id:', resultado.insertedId);

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    } finally {
        await client.close();
    }
}

connectToDatabase();