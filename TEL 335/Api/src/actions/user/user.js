const { MongoClient } = require('mongodb');
const {v4: uuidv4} = require("uuid");

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function connectToDatabase() {
    try {
        await client.connect();
        return client.db('User').collection('user');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

// Consultar todos los usuarios
exports.getUsers = async () => {
    const collection = await connectToDatabase();
    const user = await collection.findOne({ name: username })
    //console.log(user)
    return false
}

// Consultar por un usuario por nombre
exports.getOneUser = async (nameUser) => {
    const collection = await connectToDatabase();
    return await collection.findOne({ name: nameUser });
}

// Consultar por un usuario con nombre y correo
exports.getOneUserWithParams = async (nameUser, mail) => {
    const collection = await connectToDatabase();
    return await collection.findOne({ name: nameUser, mail: mail });
}

// Actualizar información de un usuario
exports.updateUser = async (updateData, oldNameUser, oldPassUser) => {
    const collection = await connectToDatabase();
    const filter = { name: oldNameUser, password: oldPassUser };
    const update = {
        $set: {
            ...(updateData.newName && { name: updateData.newName }),
            ...(updateData.newPassword && { password: updateData.newPassword }),
            ...(updateData.newMail && { mail: updateData.newMail }),
            ...(updateData.newLocation && { location: updateData.newLocation })
        }
    };
    const result = await collection.updateOne(filter, update);
    return result.modifiedCount; // 1 if successful, 0 if not found or no updates made
}

// Agregar usuario
exports.addUser = async (userData) => {
    const collection = await connectToDatabase();
    const user = {
        key: uuidv4(),
        name: userData.name,
        mail: userData.mail,
        password: userData.password,
        location: userData.location
    }
    const result = await collection.insertOne(user);
    return result.insertedId; // Return the ID of the inserted user
}

// Eliminar un usuario por correo electrónico
exports.removeUser = async (userMail) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ mail: userMail });
    return result.deletedCount; // 1 if successful, 0 if not found
}

// Autenticar usuario por nombre de usuario y contraseña
exports.authenticate = async (username, password) => {
    const collection = await connectToDatabase();
    return await collection.findOne({ name: username, password: password });
}

// Verificar si un nombre de usuario ya existe
exports.isUsernameTaken = async (username) => {
    const collection = await connectToDatabase();
    const nombre = await collection.findOne({ name: username })
    if(nombre==null){
        return false
    }
    else{
        return true
    }
}