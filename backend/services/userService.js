const BaseService = require("../core/base_service");

const db = require("../db/index");

class userService extends BaseService{
    constructor() {
        super(db.User)
        this.db = db;
    }

  async register(userPayload) {
    const existingUser = await this.db.User.findOne({
        where: {
            email: userPayload.email
        }
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await this.Utils.hashPassword(userPayload.password);
    const newUser = {
        username: userPayload.username,
        email: userPayload.email,
        password: hashedPassword,
        jwtTokenVersion: 0 // Initialize JWT token version
    };
    const createdUser = await this.db.User.create(newUser);

    return {
        message: "User registered successfully",
        user: {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email
        }
    };
}

    async login(email, password) {

        const user = await this.db.User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = this.Utils.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

       const accessToken = this.Utils.generateAccessToken({ id: user.id, jwtTokenVersion: user.jwtTokenVersion });
       const refreshToken = this.Utils.generateRefreshToken({ id: user.id, jwtTokenVersion: user.jwtTokenVersion });

        
        return {
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            accessToken,
            refreshToken
        };
    }
    
    async logout(userId) {
        const user = await this.db.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.jwtTokenVersion += 1;
        await user.save();
        return {
            message: "Logout successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }

    async deleteUser(userId) {
        const user = await this.db.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        await user.destroy();
        return {
            message: "User deleted successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }

    async updateUser(userId, userPayload) {
        const user = await this.db.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (userPayload.password) {
            userPayload.password = this.Utils.hashPassword(userPayload.password);
        }

        const updatedUser = await user.update(userPayload);

        return {
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email
            }
        };
    }

    async getUserById(userId) {
        const user = await this.db.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    async getAllUsers() {
        const users = await this.db.User.findAll({
            attributes: ['id', 'username', 'email']
        });

        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email
        }));
    }

    async getUsersByQuery(query) {
        const users = await this.db.User.findAll({
            where: query,
            attributes: ['id', 'username', 'email']
        });

        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email
        }));
    }

    async refreshToken(userId, tokenVersion) {
        const user = await this.db.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.jwtTokenVersion !== tokenVersion) {
            throw new Error("Token version mismatch");
        }

        const newAccessToken = this.Utils.generateAccessToken({ id: user.id, jwtTokenVersion: user.jwtTokenVersion });
        const newRefreshToken = this.Utils.generateRefreshToken({ id: user.id, jwtTokenVersion: user.jwtTokenVersion });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }

    async getUserByQuery(query) {
        const users = await this.db.User.findAll({
            where: query,
            attributes: ['id', 'username', 'email']
        })
    }
}


module.exports = new userService();