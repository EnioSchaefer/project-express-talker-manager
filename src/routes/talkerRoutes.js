const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateFindTalker = require('../middlewares/validateFindTalker');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkerLength = require('../middlewares/validateTalkerLength');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const { readTalkerFIle, getLastId, writeTalkerFile, findTalker } = require('../utils/utils');

const router = express.Router();

router.get('/', validateTalkerLength, async (req, res) =>
  res.status(200).json(await readTalkerFIle()));

router.get('/:id', validateFindTalker, async (req, res) => {
  const { id } = req.params;
  const foundTalker = findTalker(id);

  return res.status(200).json(foundTalker);
});

router.post('/', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const id = await getLastId();
    const newTalker = { id, ...req.body };
    await writeTalkerFile(newTalker);

    return res.status(201).json(newTalker);
  });

module.exports = router;
