const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// ******************************************************************************
const {
  default: verificarCadastro,
} = require("./componentes/verificarCadastro.js");
const { default: verificarLogin } = require("./componentes/verificarLogin.js");
// *************************   TESTES   *****************************************

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const nome = new Date();
    console.log(nome);

    cb(null, "uploads/"); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
  },
});

// **********************   CONFIGURAÇÕES   *************************************
const dados = JSON.parse(fs.readFileSync("files/db.json", "utf8"));
const upload = multer({ storage: storage });
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// **************************   ROTAS   *****************************************
// **************************   LOGIN   *****************************************
app.post("/api/login", async (req, res) => {
  const { user, senha } = req.body;
  const resp = await verificarLogin(dados, user, senha);
  return res.status(200).json(resp);
});

// *************************   CADASTRO   ***************************************
app.post("/api/cadastrar", async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(12);
  const senha = await bcrypt.hash(`${body.senha}`, salt);
  const resp = verificarCadastro(body.email, body.nome, senha);
  return res.status(200).json(resp);
});

// *****************   ATUALIZAR FOTO DE PERFIL   *******************************
app.post("api/uploadperfil", upload.single("file"), async (req, res) => {
  const { user, senha } = req.body;
  const resp = await verificarLogin(dados, user, senha);
  console.log("primeiro if");
  if (resp.login) return res.status(400).json({ msg: "Usuário invalido." });
  console.log("passou do primeiro if");
  if (!req.file) return res.status(400).json({ msg: "Erro no arquivo." });
  console.log("passou do segundo if");

  return res.status(200).json({ msg: "Foto atualizada com sucesso!" });
});
// ************************   ROTA BASE   ***************************************
app.get("/", (req, res) => res.status(200).json({ dados, msg: "ok" }));

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
