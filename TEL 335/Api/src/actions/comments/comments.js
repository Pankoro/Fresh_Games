const { MongoClient, ObjectId } = require('mongodb');
const {v4: uuidv4} = require("uuid");

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectToDatabase() {
    try {
        await client.connect();
        return client.db('User').collection('comments');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

// Agregar comentario (c)
exports.addComment = async (comentario) => {
    const collection = await connectToDatabase();
    const newComment = {
        key: uuidv4(),
        postId: comentario.postId,
        user: comentario.user,
        text: comentario.text,
        timestamp: new Date().toISOString(),
    };
    const result = await collection.insertOne(newComment);
    return result.insertedId; // Return the ID of the inserted comment
};

// Extraer comentarios de un post (r)
exports.getCommentsByPost = async (postId) => {
    const collection = await connectToDatabase();
    return await collection.find({ postId: postId }).toArray();
};

// Eliminar comentario (d)
exports.removeComment = async (postId, commentId) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ postId: postId, _id: new ObjectId(commentId) });
    return result.deletedCount; // 1 si se eliminó correctamente, 0 si no se encontró
};

// Actualizar comentario por id (UPDATE)
exports.updateComment = async (postId, commentId, newText) => {
    const collection = await connectToDatabase();
    const result = await collection.updateOne(
        { postId: postId, _id: new ObjectId(commentId) },
        { $set: { text: newText, timestamp: new Date().toISOString() } }
    );
    return result.modifiedCount; // 1 if successful, 0 if not found or no updates made
};
