const BaseController = require("../core/base_controller");

class postController extends BaseController{
    constructor() {
        super();
    }

    async createPost(req, res) {
        try {
            const userId = req.user.id;
            const postPayload =  {
                ...req.body,
                user_id: userId
            };
            const result = await this.service.postService.createPost(postPayload);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const postId = req.params.id;
            const result = await this.service.postService.getPostById(postId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updatePost(req, res) {
        try {
        const postId = req.params.id;
        const userId = req.user.id; // authMiddleware sayesinde

        const { title, content, category_id } = req.body;

        const updateData = {
            title,
            content,
            category_id,
        };

        const updatedPost = await this.service.postService.updatePost({
            postId,
            userId,
            updateData,
        });

        res.status(200).json(updatedPost);
        } catch (error) {
        res.status(403).json({ error: error.message });
        }
    }



    async deletePost(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.user.id;  // Auth middleware’den geliyor
            const result = await this.service.postService.deletePost(postId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }



    async getAllPosts(req, res) {
        try {
            const result = await this.service.postService.getAllPosts();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getPostsByUserId(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.service.postService.getPostsByUserId(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = new postController();