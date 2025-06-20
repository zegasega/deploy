const service = {};


service.userService = require("./userService");
service.postService = require("./postService");
service.categoryService = require("./categoryService");
service.commentService = require("./commentService");
service.likeService = require("./likeService");
service.cloudinaryService = require("./cloudinaryService");

module.exports = service;