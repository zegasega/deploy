const Joi = require('joi');

const commentSchema = Joi.object({
  post_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  content: Joi.string().required(),
  parent_comment_id: Joi.number().integer().allow(null)
});

module.exports = commentSchema;