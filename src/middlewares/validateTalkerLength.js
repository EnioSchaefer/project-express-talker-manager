const fs = require('fs/promises');

module.exports = async function validateTalkerLength(req, res, next) {
  const talkerJson = await fs.readFile('./src/talker.json');
  const talker = JSON.parse(talkerJson);

  if (talker.length > 0) {
    return next();
  }
  return res.status(200).json([]);
};
