const express = require('express');
const auth = require('../middleware/auth.middleware');
const Furniture = require('../models/Furniture');
const permissionService = require('../services/permission.service');
const constants = require('../utils/constants');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Furniture.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  })
  .post(auth, async (req, res) => {
    const { _id } = req.user;
    try {
      const isAdmin = permissionService.isAdmin(_id);
      if (!isAdmin) {
        return res
          .status(403)
          .json({ error: { message: 'PERMISSION_FAIL', status: 400 } });
      }

      const furnitureExist = await Furniture.findOne({ index: req.body.index });
      if (furnitureExist) {
        return res
          .status(409)
          .json({ error: { message: 'INDEX_EXISTS', status: 400 } });
      }

      const newFurniture = await Furniture.create(req.body);
      res.send(newFurniture);
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  });

router
  .route('/:itemId')
  .patch(auth, async (req, res) => {
    const { _id } = req.user;
    const { itemId } = req.params;
    try {
      const isAdmin = permissionService.isAdmin(_id);
      if (!isAdmin) {
        return res
          .status(403)
          .json({ error: { message: 'PERMISSION_FAIL', status: 400 } });
      }

      const updatedItem = await Furniture.findByIdAndUpdate(itemId, req.body, {
        returnDocument: 'after'
      });
      res.send(updatedItem);
    } catch (error) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  })
  .delete(auth, async (req, res) => {
    const { _id } = req.user;
    const { itemId } = req.params;
    try {
      const isAdmin = permissionService.isAdmin(_id);
      if (!isAdmin) {
        return res
          .status(403)
          .json({ error: { message: 'PERMISSION_FAIL', status: 400 } });
      }

      await Furniture.findByIdAndDelete(itemId);
      res.send();
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  });

router.get('/lastindex', async (req, res) => {
  try {
    const list = await Furniture.find();
    if (!list.length) {
      return res.send({ lastIndex: constants.FURNITURE_START_INDEX });
    }
    list.sort((a, b) => {
      return b.index - a.index;
    });
    const lastIndex = list[0].index;
    res.send({ lastIndex });
  } catch (e) {
    res.status(500).json({
      message: 'There is an error on server. Please try again later'
    });
  }
});

module.exports = router;
