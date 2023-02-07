const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const talker = await fs.readFile('./src/talker.json');

    return JSON.parse(talker);
  } catch (err) {
    return null;
  }
};

const getLastId = async () => {
  const talker = await readTalkerFile();
  return talker.length + 1;
};

const writeTalkerFile = async (post) => {
  try {
    const talker = await readTalkerFile();
    talker.push(post);

    return await fs.writeFile('./src/talker.json', JSON.stringify(talker));
  } catch (err) {
    return null;
  }
};

const findTalker = async (rawId) => {
  try {
    const talker = await readTalkerFile();
    const id = Number(rawId);

    const selectedTalker = talker.find((curr) => curr.id === id);
    return selectedTalker;
  } catch (err) {
    return null;
  }
};

const editTalker = async (put, rawId) => {
  try {
    const talker = await readTalkerFile();
    const id = Number(rawId);
    const index = talker.findIndex((person) => person.id === id);
    const editedTalker = { id, ...put };
    talker[index] = editedTalker;

    await fs.writeFile('./src/talker.json', JSON.stringify(talker));

    return editedTalker;
  } catch (err) {
    return null;
  }
};

const deleteTalker = async (rawId) => {
  try {
    const talker = await readTalkerFile();
    const id = Number(rawId);
    const updatedTalker = talker.filter((person) => person.id !== id);
    console.log(updatedTalker);

    return await fs.writeFile('./src/talker.json', JSON.stringify(updatedTalker));
  } catch (err) {
    return null;
  }
};

module.exports = {
  readTalkerFile,
  writeTalkerFile,
  getLastId,
  findTalker,
  editTalker,
  deleteTalker,
};
