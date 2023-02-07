const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateFindTalker = require('../middlewares/validateFindTalker');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkerLength = require('../middlewares/validateTalkerLength');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const { readTalkerFile, getLastId, writeTalkerFile,
  findTalker, editTalker, deleteTalker, searchTalker } = require('../utils/utils');

const router = express.Router();

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const searchedTalker = await searchTalker(q);

  return res.status(200).json(searchedTalker);
});

router.get('/', validateTalkerLength, async (req, res) =>
  res.status(200).json(await readTalkerFile()));

router.get('/:id', validateFindTalker, async (req, res) => {
  const { id } = req.params;
  const foundTalker = await findTalker(id);

  return res.status(200).json(foundTalker);
});

router.post('/', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const id = await getLastId();
    const newTalker = { id, ...req.body };
    await writeTalkerFile(newTalker);

    return res.status(201).json(newTalker);
  });

router.put('/:id', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate, async (req, res) => {
    const talker = req.body;
    const { id } = req.params;

    const editedTalker = await editTalker(talker, id);

    res.status(200).json(editedTalker);
  });

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  await deleteTalker(id);

  return res.status(204).end();
});

module.exports = router;
