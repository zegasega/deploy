const BaseService = require("../core/base_service");
const db = require("../db/index");

class likeService extends BaseService {
  constructor() {
    super(db.Like);
    this.db = db;
  }

  async toggleLike({ userId, postId }) {

    const existingLike = await this.db.Like.findOne({
      where: { user_id: userId, post_id: postId },
    });

    if (existingLike) {

      await existingLike.destroy();
      return { message: "post unliked" };
    } else {
      await this.model.create({ user_id: userId, post_id: postId });
      return { message: "post liked" };
    }
  }
}

module.exports = new likeService();