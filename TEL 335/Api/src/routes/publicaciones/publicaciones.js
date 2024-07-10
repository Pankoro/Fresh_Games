const publicacionActions = require('../../actions/publicaciones/publicaciones');

// READ
exports.getAllPublicaciones = async (ctx) => {
    ctx.body = await publicacionActions.getPublicaion();
    return ctx;
}

// CREATE
exports.createPublicacion = async (ctx) => {
    await publicacionActions.addPublicacion(ctx.request.body);
    ctx.body = { message: 'Publicacion ha sido creada' };
    return ctx;
}

// DELETE
exports.removePublicacion = async (ctx) => {
    await publicacionActions.removePublicacion(ctx.params.publicacionName);
    ctx.body = { message: 'Publicacion ha sido removida' };
    return ctx;
}

// UPDATE
exports.updatePublicacion = async (ctx) => {
    const { publicacionName } = ctx.params;
    const newData = ctx.request.body;
    const updated = await publicacionActions.updatePublicacion(publicacionName, newData);
    if (updated) {
        ctx.body = { message: 'Publicacion ha sido actualizada' };
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Publicacion no encontrada' };
    }
    return ctx;
}

// READ ONE
exports.getPublicacionByName = async (ctx) => {
    const { publicacionName } = ctx.params;
    const publicacion = await publicacionActions.getPublicacionByName(publicacionName);
    if (publicacion) {
        ctx.body = publicacion;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Publicacion no encontrada' };
    }
    return ctx;
}

// READ ONE by key
exports.getPublicacionByKey = async (ctx) => {
    const { publicacionKey } = ctx.params;
    const publicacion = await publicacionActions.getPublicacionByKey(publicacionKey);
    if (publicacion) {
        ctx.body = publicacion;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'Publicacion no encontrada' };
    }
    return ctx;
}

// Buscar publicaciones por coincidencia
exports.searchPublicaciones = async (ctx) => {
    const query = ctx.query.q || '';
    ctx.body = await publicacionActions.searchPublicaciones(query);
    return ctx;
};
