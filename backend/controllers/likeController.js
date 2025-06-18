const BaseController = require("../core/base_controller");

class likeController extends BaseController{
    constructor(){
        super();
    }

    async ToggleLike(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: "Unauthorized: user not found" });
            }
            const userId = req.user.id;
            const postId = req.params.postId;
            const result = await this.service.likeService.toggleLike({ userId, postId });
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new likeController();