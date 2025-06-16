const BaseService = require("../core/base_service");
const db = require("../db/index");

class postService extends BaseService{
    constructor() {
        super(db.User);
        this.db = db;
    }

    async createPost(postPayload) {
    const existingCategory = await this.db.Category.findOne({
        where: { id: postPayload.category_id }
    });

    if (!existingCategory) {
        throw new Error("This Category does not exist");
    }

    const newPost = await this.db.Post.create(postPayload);

    return newPost;
    }


    async getPostById(postId) {
        const post = await this.db.Post.findByPk(postId, {
            include: [{ model: this.db.User, as: 'author' }]
        });
        if (!post) {
            throw new Error("There is no post with this ID");
        }
        return post;
    }

    async updatePost(postId, postPayload) {
        const post = await this.db.Post.findByPk(postId);
        if (!post) {
            throw new Error("There is no post with this ID");
        }
        await post.update(postPayload);
        return post;
    }

    async deletePost(postId) {
        const post = await this.db.Post.findByPk(postId);
        if (!post) {
            throw new Error("There is no post with this ID");
        }
        await post.destroy();
        return { message: "Post deleted successfully" };
    }


    async getAllPosts() {
        const posts = await this.db.Post.findAll({
            include: [{ model: this.db.User, as: 'author' }]
        });

        if (posts.length === 0) {
            throw new Error("No posts found");
        }
        
        return posts;
    }

    async getPostsByUserId(userId) {
        const posts = await this.db.Post.findAll({
            where: { user_id: userId },
            include: [{ model: this.db.User, as: 'author' }]
        });
        return posts;
    }
}

module.exports = new postService();