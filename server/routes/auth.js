const express = require('express');
const router = express.Router();

// Controllers
const authControllers = require('../controllers/auth');

// Middlewares
const authMiddleware = require('../middlewares/auth');

router.post(
  '/create-or-update-user',
  authMiddleware.authCheck,
  authControllers.createOrUpdateUser
);
router.post(
  '/current-user',
  authMiddleware.authCheck,
  authControllers.currentUser
);
router.post(
  '/current-admin',
  authMiddleware.authCheck,
  authMiddleware.adminCheck,
  authControllers.currentUser
);

module.exports = router;
