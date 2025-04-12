const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

// ******************************************************************************
const {
  default: verificarCadastro,
} = require("./componentes/verificarCadastro.js");
const { default: verificarLogin } = require("./componentes/verificarLogin.js");
const { default: verificarToken } = require("./componentes/verificarToken.js");
// *************************   TESTES   *****************************************
// *************************   MULTER   *****************************************
// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/imgs/public"); // Diretório para salvar os arquivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
  },
});
const upload = multer({ storage: storage });
// **********************   CONFIGURAÇÕES   *************************************
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static("assets"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const dados = JSON.parse(fs.readFileSync("files/db.json", "utf8"));
const secretKey = "aekj5kljwlkgjslçdkfjg54jgskldfg";

// **************************   ROTAS   *****************************************
// **************************   LOGIN   *****************************************
app.post("/api/login", async (req, res) => {
  try {
    const { user, senha } = req.body;
    const resp = await verificarLogin(dados, user, senha, secretKey);
    return res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Erro na requisição" });
  }
});
// **********************   VALIDAR TOKEN   *************************************
app.get("/api/validartoken", async (req, res) => {
  const idToken = req.query.id;
  const token = req.query.token;

  if (!token)
    return res.status(401).json({ login: false, msg: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, secretKey);
    const us = dados.find((u) => u.id === decoded.id);

    if (!(idToken && decoded.id === idToken)) {
      return res.status(403).json({
        login: false,
        msg: "ID do token não corresponde ao ID fornecido",
      });
    }
    const { id, foto_perfil, user, email } = us;
    return res.json({
      login: true,
      info: { id, foto_perfil, user, email, token },
    });
  } catch (err) {
    return res.status(401).json({ login: false, msg: "Token inválido" });
  }
});
// *************************   CADASTRO   ***************************************
app.post("/api/cadastrar", async (req, res) => {
  if (!body.email || !body.nome || !body.senha) {
    return res.status(400).json({ msg: "Campos obrigatórios faltando." });
  }
  const body = req.body;
  const salt = await bcrypt.genSalt(12);
  const senha = await bcrypt.hash(`${body.senha}`, salt);
  const resp = verificarCadastro(body.email, body.nome, senha);
  return res.status(200).json(resp);
});
// *****************   ATUALIZAR FOTO DE PERFIL   *******************************
app.post("/api/uploadperfil", upload.single("file"), async (req, res) => {
  try {
    const { user, senha } = req.body;
    // Se o arquivo NÃO foi enviado
    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
    }

    const usuarioAtualizado = await verificarLogin(dados, user, senha);
    if (!usuarioAtualizado.login) {
      await fs
        .unlink(req.file.path)
        .catch((err) =>
          console.error("Erro ao deletar o arquivo:", err.message)
        );
      return res.status(200).json({ msg: "Usuário ou senha invalido!" });
    }
    var resp = {};

    const ma = dados.map((x) => {
      if (x.user == user) {
        const usuarioAtualizado = { ...x, foto_perfil: `/${req.file.path}` };
        resp = { ...usuarioAtualizado, senha: undefined };
        return usuarioAtualizado;
      }
      return x;
    });
    await fs.promises.writeFile("files/db.json", JSON.stringify(ma), "utf8");

    return res.status(200).json({
      login: true,
      msg: "Foto atualizada com sucesso!",
      info: { ...resp },
    });
  } catch (error) {
    console.log("erro ");
    return res.status(500).json({ msg: "Erro interno." });
  }
});
// *****************   ATUALIZAR FOTO DE PERFIL   *******************************
app.get("/api/feed", (req, res) => {
  const pag = req.query.pag;
  const id = req.query.id;
  const token = req.query.token;

  return res.status(200).json({ msg: "reels enviado!!" });
});
// ************************   ROTA BASE   ***************************************
app.get("/", (req, res) => res.status(200).json({ dados, msg: "ok" }));

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
