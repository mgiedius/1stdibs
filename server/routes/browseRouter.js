const express = require('express');
const cachedItems = require('../data/items.json');

const browseRouter = express.Router();

const getItems = (payload) => {
  const start = Number.parseInt(payload.start, 10) || 0;
  const limit = Number.parseInt(payload.limit, 10) || 9;
  const items = cachedItems.slice(start, start + limit);

  return {
    items,
    totalItems: cachedItems.length,
  };
};

browseRouter.get('', (req, res) => {
  const response = getItems(req.query);
  res.status(200).json(response);
});

module.exports = browseRouter;
