const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");

// ******************************************************************************
const {
  default: verificarUsuarios,
} = require("./componentes/verificarUsuarios.js");
const {
  default: verificarCadastro,
} = require("./componentes/verificarCadastro.js");

// ******************************************************************************

const dados = JSON.parse(fs.readFileSync("files/db.json", "utf8"));
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// **************************   ROTAS   *****************************************
app.post("/api/login", (req, res) => {
  const { user, senha } = req.body;
  const ts = verificarUsuarios(dados, user, senha);

  return res.status(200).json(ts);
});

app.post("/api/cadastrar", async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(12);
  const senha = await bcrypt.hash(`${body.senha}`, salt);
  console.log(senha);
  const resp = verificarCadastro(body.email, body.nome, senha);
  return res.status(200).json(resp);
});

app.get("/", (req, res) => res.status(200).json({ dados, msg: "ok" }));

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
