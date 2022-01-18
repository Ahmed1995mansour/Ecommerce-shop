const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
  res.json({
    data: 'Hi from user api endpoint',
  });
});

module.exports = router;
