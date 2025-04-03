const VerificarUsuarios = require("./componentes/verificarUsuarios.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const {
  default: verificarUsuarios,
} = require("./componentes/verificarUsuarios.js");
const dados = JSON.parse(fs.readFileSync("files/db.json", "utf8"));

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  const { user, senha } = req.body;
  const ts = verificarUsuarios(dados, user, senha);

  return res.status(200).json(ts);
});

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
