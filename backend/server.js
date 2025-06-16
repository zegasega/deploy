const http = require('http');
const app = require('./app');
const db = require('./db/index');
require('dotenv').config();



const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection successful');

    await db.sequelize.sync({ alter: true, force: true });
    console.log('Tables synchronized');
    
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
