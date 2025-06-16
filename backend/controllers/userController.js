const BaseController = require("../core/base_controller");

class userController extends BaseController{
    constructor() {
        super();
    }

    async register(req, res) {
        try {
            const userPayload = req.body;
            const result = await this.service.userService.register(userPayload);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.service.userService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            const userId = req.user.id;
            await this.service.userService.logout(userId);
            res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id;
            await this.service.userService.deleteUser(userId);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const userId = req.user.id;
            const userPayload = req.body;
            const result = await this.service.userService.updateUser(userId, userPayload);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.service.userService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.service.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.service.userService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserByQuery(req, res) {
        try {
            const query = req.query;
            const users = await this.service.userService.getUserByQuery(query);
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = new userController();