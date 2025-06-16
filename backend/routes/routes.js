const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const postController = require("../controllers/postController");
const categoriyController = require("../controllers/categoryController");
const commentController = require("../controllers/commentController");

// User routes
router.get("/users", authMiddleware,  (req, res) => userController.getAllUsers(req, res));
router.get("/users/:id", authMiddleware, (req, res) => userController.getUserById(req, res));
router.get("/user/query", authMiddleware, (req, res) => userController.getUserByQuery(req, res));


// User authentication routes
router.post("/auth/register", (req, res) => userController.register(req, res));
router.post("/auth/login", (req, res) => userController.login(req, res));
router.post("/auth/logout", authMiddleware, (req, res) => userController.logout(req, res));
router.put("/auth/user", authMiddleware, (req, res) => userController.update(req, res));
router.delete("/auth/user", authMiddleware, (req, res) => userController.delete(req, res));

// Post routes
router.get("/posts", authMiddleware, (req, res) => postController.getAllPosts(req, res));
router.get("/posts/:id", authMiddleware, (req, res) => postController.getPostById(req, res));
router.post("/posts", authMiddleware, (req, res) => postController.createPost(req, res));
router.put("/posts/:id", authMiddleware, (req, res) => postController.updatePost(req, res));
router.delete("/posts/:id", authMiddleware, (req, res) => postController.deletePost(req, res));


// Category routes
router.get("/categories", authMiddleware, (req, res) => categoriyController.getAll(req, res));
router.get("/categories/:id", authMiddleware, (req, res) => categoriyController.getById(req, res));
router.post("/categories", authMiddleware, roleMiddleware("admin"), (req, res) => categoriyController.create(req, res));
router.put("/categories/:id", authMiddleware, roleMiddleware("admin"), (req, res) => categoriyController.update(req, res));
router.delete("/categories/:id", authMiddleware, roleMiddleware("admin"), (req, res) => categoriyController.delete(req, res));

// comments routes
router.get("/comments", authMiddleware, (req, res) => commentController.getAllComments(req, res));
router.get("/comments/:id", authMiddleware, (req, res) => commentController.getCommentById(req, res));
router.post("/comments", authMiddleware, (req, res) => commentController.createComment(req, res));
router.put("/comments/:id", authMiddleware, (req, res) => commentController.updateComment(req, res));
router.delete("/comments/:id", authMiddleware, (req, res) => commentController.deleteComment(req, res));
router.get("/comments/post/:postId", authMiddleware, (req, res) => commentController.getCommentsByPostId(req, res));

module.exports = router;
