const fs = require('fs/promises');

const readTalkerFIle = async () => {
  try {
    const talker = await fs.readFile('./src/talker.json');

    return JSON.parse(talker);
  } catch (err) {
    return null;
  }
};

const getLastId = async () => {
  const talker = await readTalkerFIle();
  return talker.length + 1;
};

const writeTalkerFile = async (post) => {
  try {
    const talker = await readTalkerFIle();
    talker.push(post);

    return await fs.writeFile('./src/talker.json', JSON.stringify(talker));
  } catch (err) {
    return null;
  }
};

const findTalker = async (rawId) => {
  try {
    const talker = await readTalkerFIle();
    const id = Number(rawId);

    const selectedTalker = talker.find((curr) => curr.id === id);
    return selectedTalker;
  } catch (err) {
    return null;
  }
};

module.exports = {
  readTalkerFIle,
  writeTalkerFile,
  getLastId,
  findTalker,
};
