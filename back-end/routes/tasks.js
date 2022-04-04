const express = require("express");
const router = express.Router();
const database = require("../database-functions");

module.exports = () => {
  router.get("/", (req, res) => {
    const { startdate, enddate } = req.query;
    database.getAllTasksByMonth(startdate, enddate).then(data => {
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
