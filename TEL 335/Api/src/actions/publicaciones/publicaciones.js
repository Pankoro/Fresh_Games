const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function connectToDatabase() {
    try {
        await client.connect();
        return client.db('User').collection('publications');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

// Consultar todas las publicaciones
exports.getPublicaion = async () => {
    const collection = await connectToDatabase();
    return await collection.find().toArray();
}

// Consultar una sola publicación por su nombre
exports.getPublicacionByName = async (PublicacionName) => {
    const collection = await connectToDatabase();
    return await collection.findOne({ name: PublicacionName });
};

// Buscar publicaciones por coincidencia en nombre, dueño del juego o descripción
exports.searchPublicaciones = async (query) => {
    const collection = await connectToDatabase();
    return await collection.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { DueñoDelJuego: { $regex: query, $options: 'i' } },
            { info: { $regex: query, $options: 'i' } }
        ]
    }).toArray();
};

// Consultar una sola publicación por su key
exports.getPublicacionByKey = async (publicacionKey) => {
    const collection = await connectToDatabase();
    return await collection.findOne({ key: publicacionKey });
}

// Agregar publicación con ID único generado automáticamente
exports.addPublicacion = async (PublicacionData) => {
    const collection = await connectToDatabase();
    const publicacion = {
        key: uuidv4(), // Generamos un ID único para la publicación
        name: PublicacionData.name,
        DueñoDelJuego: PublicacionData.owner,
        ventaOcambio: PublicacionData.ventaOcambio,
        valoracion: PublicacionData.valoracion,
        valor: PublicacionData.valor,
        location: PublicacionData.location,
        estado: PublicacionData.estado,
        info: PublicacionData.info,
        foto: PublicacionData.foto
    }
    const result = await collection.insertOne(publicacion);
    return result.insertedId; // Return the ID of the inserted publicacion
}

// Modificar datos de una publicación existente
exports.updatePublicacion = async (PublicacionName, newData) => {
    const collection = await connectToDatabase();
    const result = await collection.updateOne(
        { name: PublicacionName },
        { $set: newData }
    );
    return result.modifiedCount; // 1 if successful, 0 if not found or no updates made
}

// Eliminar una publicación por su nombre
exports.removePublicacion = async (PublicacionName) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ name: PublicacionName });
    return result.deletedCount; // 1 if successful, 0 if not found
}