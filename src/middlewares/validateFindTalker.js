const fs = require('fs/promises');

module.exports = async function validateTalkerLength(req, res, next) {
  const talkerJson = await fs.readFile('./src/talker.json');
  const talker = JSON.parse(talkerJson);

  const { id } = req.params;

  const foundTalker = talker.find((person) => person.id === Number(id));

  if (foundTalker) {
    return next();
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};
