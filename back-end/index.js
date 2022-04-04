const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes());

app.get("/", (req, res) => {
  res.send("Welcome to the quota backend");
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
