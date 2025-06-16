
class BaseService {
  constructor(model) {
    this.model = model;
    this.Utils = require("../utils/utils");

  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll(filter = {}) {
    return this.model.findAll({ where: filter });
  }

  async findOne(filter = {}) {
    return this.model.findOne({ where: filter });
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.update(data);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.destroy();
  }
}

module.exports = BaseService;