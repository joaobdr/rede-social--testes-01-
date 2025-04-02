const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

app.post("/api/login", (req, res) => {
  const body = req.body;

  console.log(body);

  return res.status(200).json({ msg: "Login Ok" });
});

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
