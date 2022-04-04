const express = require("express");
const router = express.Router();
const database = require("../database-functions");

module.exports = () => {
  router.get("/", (req, res) => {
    console.log(req.query);
    // request will end to include start and end dates
    database.getAllTasksByMonth("2022-5-1", "2022-5-30").then(data => {
      res.json(data);
    });
  });

  router.post("/", (req, res) => {
    database.createTask().then(data => {
      res.json(data);
    });
  });
  return router;
};
