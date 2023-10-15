const { NotFoundError } = require('../util/errors');
const { readDataFromFile, writeDataToFile } = require('../util/data');

const getAll = async () => {
  const userData = await readDataFromFile('mock-data/users.json');

  if (!userData) {
    throw new NotFoundError('Could not retrieve users.');
  }
  return userData.users;
};

const createUser = async (user) => {
  const existingData = await readDataFromFile('mock-data/users.json');
  const updatedUsers = [...existingData.users, user];
  await writeDataToFile('mock-data/users.json', { users: updatedUsers });
};

exports.getAllUsers = getAll;
exports.createUser = createUser;
