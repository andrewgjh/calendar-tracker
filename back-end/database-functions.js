const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllUsers = () => {
  const queryStatement = `
  SELECT * FROM users`;
  return db.query(queryStatement).then(data => {
    return Promise.resolve(data.rows[0]);
  });
};

const createTask = userid => {};

module.exports = {
  getAllUsers,
  createTask,
};
