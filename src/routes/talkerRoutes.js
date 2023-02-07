const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateFindTalker = require('../middlewares/validateFindTalker');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkerLength = require('../middlewares/validateTalkerLength');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const talker = require('../talker.json');

const router = express.Router();

router.get('/', validateTalkerLength, (req, res) => res.status(200).json(talker));

router.get('/:id', validateFindTalker, (req, res) => {
  const { id } = req.params;

  const foundTalker = talker.find((person) => person.id === Number(id));
  return res.status(200).json(foundTalker);
});

router.post('/', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, (req, res) => {
    const id = talker[talker.length - 1].id + 1;
    const newTalker = { id, ...req.body };
    talker.push(newTalker);

    return res.status(201).json({ newTalker });
  });

module.exports = router;
