const express = require("express");
const router = express.Router();
const database = require("../database-functions");

module.exports = () => {
  router.get("/", (req, res) => {
    database.getAllUsers().then(data => {
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
