const BaseController = require('../core/base_controller');

class commentController extends BaseController{
    constructor() {
        super();
    }

    async createComment(req, res) {
        const userId = req.user.id;
        const commentPayload = {
        ...req.body,
        user_id: userId,
        };

        try {
        const result = await this.service.commentService.createComment(commentPayload);
        res.status(201).json(result);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }

    async getCommentsByPost(req, res) {
        const postId = req.params.postId;

        try {
        const result = await this.service.commentService.getCommentsByPostId(postId);
        res.status(200).json(result);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
}




module.exports = new commentController();