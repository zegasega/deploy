const Joi = require('joi');

const postSchema = Joi.object({
  user_id: Joi.number()
    .integer()
    .positive()
    .required(),

  category_id: Joi.number()
    .integer()
    .positive()
    .required(),

  title: Joi.string()
    .min(3)
    .max(255)
    .required(),

  content: Joi.string()
    .min(10)
    .required(),

  is_published: Joi.boolean()
    .default(false),
});

module.exports = postSchema;
