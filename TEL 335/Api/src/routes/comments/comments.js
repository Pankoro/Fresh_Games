const commentsActions = require('../../actions/comments/comments');
const { ObjectId } = require('mongodb');

// Obtener comentarios de un post específico
exports.getCommentsByPostId = async (ctx) => {
    const postId = ctx.params.postId;
    ctx.body = await commentsActions.getCommentsByPost(postId);
};

// Crear un comentario
exports.addComment = async (ctx) => {
    await commentsActions.addComment(ctx.request.body);
    ctx.body = { message: 'Comment was created' };
};

// Eliminar comentario por postId y commentId// Eliminar comentario por postId y commentId
exports.removeComment = async (ctx) => {
  const postId = ctx.params.postId;
  const commentId = ctx.params.commentId;

  try {
    const removed = await commentsActions.removeComment(postId, new ObjectId(commentId));
    if (removed) {
      ctx.status = 200;
      ctx.body = { message: 'Comment was removed' };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Comment not found' };
    }
  } catch (error) {
    console.error('Error removing comment:', error);
    ctx.status = 400;
    ctx.body = { message: 'Error removing comment' };
  }
};

// Actualizar comentario por id
exports.updateComment = async (ctx) => {
    const postId = ctx.params.postId;
    const commentId = ctx.params.commentId;
    const newText = ctx.request.body.text;

    try {
        const updated = await commentsActions.updateComment(postId, commentId, newText);
        if (updated) {
            ctx.status = 200;
            ctx.body = { message: 'Comment was updated' };
        } else {
            ctx.status = 404;
            ctx.body = { message: 'Comment not found' };
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        ctx.status = 400;
        ctx.body = { message: 'Error updating comment' };
    }
};
