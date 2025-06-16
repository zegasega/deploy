const BaseController = require('../core/base_controller');

class commentController extends BaseController{
    constructor() {
        super();
    }

    async createComment(req, res) {
        const userId = req.user.id;
        const commentPayload = {
            ...req.body,
            user_id: userId
        };

        try {
            const result = await this.service.commentService.createComment(commentPayload);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    async getCommentById(req, res) {
        try {
            const commentId = req.params.id;
            const result = await this.service.commentService.getCommentById(commentId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateComment(req, res) {
        try {
            const commentId = req.params.id;
            const commentPayload = req.body;
            const result = await this.service.commentService.updateComment(commentId, commentPayload);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;
            const result = await this.service.commentService.deleteComment(commentId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getAllComments(req, res) {
        try {
            const result = await this.service.commentService.getAllComments();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCommentsByPostId(req, res) {
        try {
            const postId = req.params.postId;
            const result = await this.service.commentService.getCommentsByPostId(postId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = new commentController();