const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllTasksByMonth = (startdate, enddate) => {
  const queryStatement = `
  SELECT * FROM tasks 
  WHERE
  task_date >= $1
  AND task_date <= $2;`;
  queryParams = [startdate, enddate];
  return db.query(queryStatement, queryParams).then(data => {
    return Promise.resolve(data.rows);
  });
};

const createTask = userid => {};

module.exports = {
  getAllTasksByMonth,
  createTask,
};
