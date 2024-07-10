const userActions = require('../../actions/user/user');

// READ
exports.getAllUsers = async (ctx) => {
    ctx.body = await userActions.getUsers();
    return ctx;
}

exports.getUser = async (ctx) => {
    ctx.body = await userActions.getOneUser(ctx.params.nameUser);
    return ctx;
}

exports.getMail = async (ctx) => {
    let user = await userActions.getOneUser(ctx.params.nameUser);
    ctx.body = {
        "mail": user ? user.mail : null
    };
    return ctx;
}

exports.getUserWithTwoParams = async (ctx) => {
    ctx.body = await userActions.getOneUserWithParams(ctx.params.nameUser, ctx.params.mail);
    return ctx;
}

// CREATE
exports.createUser = async (ctx) => {
    if (!ctx.request.body.name || !ctx.request.body.password || !ctx.request.body.mail || !ctx.request.body.location) {
        ctx.status = 400;
        ctx.body = { message: 'Debe incluir todos los campos' };
        return ctx;
    }
    await userActions.addUser(ctx.request.body);
    ctx.body = { message: 'User was created' };
    return ctx;
}

// UPDATE
exports.updateUser = async (ctx) => {
    const { nameUser } = ctx.params;
    const { oldPassword, newPassword, newName, newMail, newLocation } = ctx.request.body;

    if (!nameUser || !oldPassword) {
        ctx.status = 400;
        ctx.body = { message: 'Debe incluir todos los campos' };
        return ctx;
    }

    const updateResult = await userActions.updateUser({ newPassword, newName, newMail, newLocation }, nameUser, oldPassword);

    if (updateResult === 1) {
        ctx.status = 200;
        ctx.body = { message: 'Información actualizada' };
    } else {
        ctx.status = 400;
        ctx.body = { message: 'Error al actualizar la información, confirme que el nombre de usuario y contraseña fueron ingresados correctamente' };
    }
    return ctx;
}

// DELETE
exports.removeUser = async (ctx) => {
    await userActions.removeUser(ctx.params.userMail);
    ctx.body = { message: 'User was removed' };
    return ctx;
}

exports.authenticate = async (ctx) => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 400;
        ctx.body = { message: 'Por favor, ingrese un nombre de usuario y contraseña.' };
        return;
    }

    const user = await userActions.authenticate(username, password);

    if (user) {
        ctx.status = 200;
        ctx.body = { message: 'Autenticación exitosa', user };
    } else {
        ctx.status = 201;
        ctx.body = { message: 'Nombre de usuario o contraseña incorrectos' };
    }
}

exports.checkDuplicateUser = async (ctx) => {
    const username = ctx.params.name;
    //console.log(username)
    if (!username) {
        ctx.status = 400;
        ctx.body = { message: 'Por favor, ingrese un nombre de usuario y contraseña.' };
        return;
    }
    const isNameTaken = await userActions.isUsernameTaken(username);
    //console.log(isNameTaken)

    if (!isNameTaken) {
        ctx.status = 200;
        ctx.body = { message: 'Nombre de usuario correcto', isNameTaken };
    } else {
        ctx.status = 200;
        ctx.body = { message: 'Nombre de usuario ya existente', isNameTaken };
    }
}