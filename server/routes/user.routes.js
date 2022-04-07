const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'There is an error on server. Please try again later' });
  }
});
router
  .route('/:_id')
  .get(auth, async (req, res) => {
    const currentUserId = req.user._id;
    const { _id } = req.params;
    try {
      if (currentUserId !== _id) {
        return res
          .status(403)
          .json({ message: 'You have no permission for this action' });
      }
      const currentUser = await User.findOne({ _id });
      res.send(currentUser);
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  })
  .patch(auth, async (req, res) => {
    const currentUserId = req.user._id;
    const { _id } = req.params;
    try {
      if (currentUserId !== _id) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
        new: true
      });
      res.send(updatedUser);
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  });

module.exports = router;
