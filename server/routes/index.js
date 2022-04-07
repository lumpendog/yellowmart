const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/category', require('./category.routes'));
router.use('/furniture', require('./furniture.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
