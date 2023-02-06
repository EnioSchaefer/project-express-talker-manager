const express = require('express');
const validateFindTalker = require('../middlewares/validateFindTalker');
const validateTalkerLength = require('../middlewares/validateTalkerLength');
const talker = require('../talker.json');

const router = express.Router();

router.get('/', validateTalkerLength, (req, res) => res.status(200).json(talker));

router.get('/:id', validateFindTalker, (req, res) => {
  const { id } = req.params;

  const foundTalker = talker.find((person) => person.id === Number(id));
  return res.status(200).json(foundTalker);
});

module.exports = router;
