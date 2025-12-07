const express = require('express');
const sequelize = require('./database/config');
require('dotenv').config();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const sha256Routes = require('./routes/sha256Routes');
const urlRoutes = require('./routes/urlRoutes');
const ipPortRoutes = require('./routes/ipPortRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'ThreatFox IOC API',
    version: '1.0.0',
    endpoints: {
      sha256: '/api/sha256',
      urls: '/api/urls',
      ipports: '/api/ipports'
    }
  });
});

app.use('/api/sha256', sha256Routes);
app.use('/api/urls', urlRoutes);
app.use('/api/ipports', ipPortRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API endpoints available at:`);
      console.log(`  - http://localhost:${PORT}/api/sha256`);
      console.log(`  - http://localhost:${PORT}/api/urls`);
      console.log(`  - http://localhost:${PORT}/api/ipports`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
