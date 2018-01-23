const express = require('express');
const cachedItems = require('../data/items.json');

const itemRouter = express.Router();

const getItem = itemId => cachedItems
  .find(item => item.id === itemId || item.integerId === itemId) || false;

itemRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = getItem(id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json();
  }
});

module.exports = itemRouter;
