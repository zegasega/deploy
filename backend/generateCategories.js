const db = require('./db/index');

async function insertDefaultCategories() {
  const defaultCategories = ['Technology', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food', 'Finance', 'Entertainment', 'Sports', 'Science', 'Politics', 'Business', 'Art', 'History', 'Nature'];

  for (const name of defaultCategories) {
    const [category, created] = await db.Category.findOrCreate({
      where: { name }
    });
    if(created) {
      console.log(`Default category '${name}' created.`);
    }
  }
}

module.exports = insertDefaultCategories;