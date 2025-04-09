const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// ******************************************************************************
const { default: verificarCadastro,} = require("./componentes/verificarCadastro.js");
const { default: verificarLogin } = require("./componentes/verificarLogin.js");
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

// **************************   ROTAS   *****************************************
// **************************   LOGIN   *****************************************
app.post("/api/login", async (req, res) => {
  try{
    const { user, senha } = req.body;
    const resp = await verificarLogin(dados, user, senha);
    return res.status(200).json(resp);
  }catch(err){
    console.log('err');
    return res.status(500).json({msg: "Erro na requisição"});
  }
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
app.post('/api/uploadperfil', upload.single('file'), async (req, res) => {
  try {
    const {user, senha} = req.body;  
    const ts = await verificarLogin(dados, user, senha)
    if(!ts.login){
      fs.unlink(req.file.path, (err) => {
        if (err)console.error('Erro ao deletar o arquivo:')
      });
      return res.status(200).json({ msg: 'Usuário ou senha invalido!'})
    }
    var resp = {};

    const ma = dados.map(x => {
      if(x.user == user) {
      const ts = {...x, foto_perfil: `/${req.file.path}`}
      resp = {...ts, senha: undefined, id: undefined}
      return ts
    }
      return x
    })  

    fs.writeFile("files/db.json", JSON.stringify(ma), "utf8", (err) => {
      if (err) resp = { cadastro: false, msg: "Erro no cadastro, tente mais tarde." };
    });
    
    // Se o arquivo NÃO foi enviado
    if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem foi enviada' })

    return res.status(200).json({login: true,msg: 'Foto atualizada com sucesso!', info: {...resp}, token: "01"})
  } catch (error) {
    console.log('erro ');
    return res.status(500).json({msg: 'Erro interno.'}) 
  }
});
// ************************   ROTA BASE   ***************************************
app.get("/", (req, res) => res.status(200).json({ dados, msg: "ok" }));

app.listen(port, () => {
  console.log("servidor rodando na porta:");
  console.log(`http://localhost:3000/`);
});
