const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const postController = require("../controllers/postController");


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


module.exports = router;
