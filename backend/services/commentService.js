const BaseService = require("../core/base_service");
const db = require("../db/index");
class commentService extends BaseService {
    constructor() {
        super(db.Comment);
        this.db = db;
    }

    async createComment(commentPayload) {
        const { post_id } = commentPayload;

        const post = await this.db.Post.findByPk(post_id);
        if (!post) throw new Error("Post not found");

        return await this.db.Comment.create(commentPayload);
    }

    async getCommentsByPostId(postId) {
        return await this.db.Comment.findAll({
            where: { post_id: postId },
            include: [
                {
                    model: this.db.User,
                    as: 'author',
                    attributes: ['id', 'username']
                }
            ],
            order: [['created_at', 'ASC']],
        });
    }
}

module.exports = new commentService();