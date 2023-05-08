const express = require('express');
const cors = require('cors');
const { Routes } = require('./routes');

const app = express();
const port = 3000;

const bootstrap = () => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

const setupRoutes = () => {
  app.use(cors());
  app.get('/items', Routes.ITEMS);
};

setupRoutes();
bootstrap();