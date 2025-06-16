const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .allow('', null)
    .optional()
});

module.exports = categorySchema;