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

    async updatePost({ postId, userId, updateData }) {
        const post = await this.db.Post.findByPk(postId);
        if (!post) {
        throw new Error("Post bulunamadı.");
        }

        if (post.user_id !== userId) {
        throw new Error("Bu postu güncelleme yetkiniz yok.");
        }

        await post.update(updateData);
        return post;
    } 



    async deletePost(postId, userId) {
        const post = await this.db.Post.findByPk(postId);
        if (!post) {
            throw new Error("There is no post with this ID");
        }

        if (post.user_id !== userId) {  // post.id değil post.user_id olmalı
            throw new Error("Başkasının postunu silemezsin");
        }

        await post.destroy();
        return { message: "Post deleted successfully" };
    }



    async getAllPosts() {
        const posts = await this.db.Post.findAll();
        
        return posts;
    }

    async getPostsByUserId(userId) {
    
        const posts = await this.db.Post.findAll({
            where: {
                user_id: parseInt(userId, 10)
            },
            include: [
                {
                    model: this.db.User,
                    as: 'author',
                    attributes: ['id', 'username']
                },
                {
                    model: this.db.Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        });

      

        return posts;
    }

}

module.exports = new postService();