const BaseController = require("../core/base_controller");

class categoryControllar extends BaseController {
    constructor() {
        super();
    }

    async create(req, res) {
        try {
            const categoryPayload = req.body;
            const result = await this.service.categoryService.createCategory(categoryPayload);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const categoryId = req.params.id;
            const result = await this.service.categoryService.getCategoryById(categoryId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const categoryId = req.params.id;
            const categoryPayload = req.body;
            const result = await this.service.categoryService.updateCategory(categoryId, categoryPayload);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const categoryId = req.params.id;
            const result = await this.service.categoryService.deleteCategory(categoryId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const result = await this.service.categoryService.getAllCategories();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = new categoryControllar();