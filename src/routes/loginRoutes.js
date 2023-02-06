const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const token = (Math.random().toString(36).substring(2)
    + Math.random().toString(36).substring(2)).substring(0, 16);

  return res.status(200).json({ token });
});

module.exports = router;
