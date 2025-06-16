const BaseService = require("../core/base_service");
const db = require("../db/index");
class commentService extends BaseService{
    constructor() {
        super(db.Comment);
        this.db = db;
    }

    async createComment(commentPayload) {
        const post = await this.db.Post.findByPk(commentPayload.post_id);
        if (!post) {
            throw new Error("Post not found");
        }

        return await this.db.Comment.create(commentPayload);
    }

    async getCommentById(commentId) {
        const comment = await this.db.Comment.findByPk(commentId, {
            include: [{ model: this.db.User, as: 'author' }, { model: this.db.Post, as: 'post' }]
        });
        if (!comment) {
            throw new Error("Comment not found");
        }
        return comment;
    }

    async updateComment(commentId, commentPayload) {
        const comment = await this.db.Comment.findByPk(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        await comment.update(commentPayload);
        return comment;
    }

    async deleteComment(commentId) {
        const comment = await this.db.Comment.findByPk(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        await comment.destroy();
        return { message: "Comment deleted successfully" };
    }

    async getAllComments() {
        const comments = await this.db.Comment.findAll({
            include: [{ model: this.db.User, as: 'author' }, { model: this.db.Post, as: 'post' }]
        });

        if (comments.length === 0) {
            throw new Error("No comments found");
        }

        return comments;
    }

    async getCommentsByPostId(postId) {
        const comments = await this.db.Comment.findAll({
            where: { post_id: postId },
            include: [{ model: this.db.User, as: 'author' }]
        });

        if (comments.length === 0) {
            throw new Error("No comments found for this post");
        }

        return comments;
    }
}

module.exports = new commentService();