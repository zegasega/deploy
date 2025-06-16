const validation_schema = {};

validation_schema.userSchema = require('./userSchema');
validation_schema.categorySchema = require('./categorySchema');
validation_schema.postSchema = require('./postSchema');
validation_schema.commentSchema = require('./commentSchema');

module.exports = validation_schema;