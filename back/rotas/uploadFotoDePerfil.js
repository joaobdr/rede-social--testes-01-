const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();


// ********************     COMPONENTES     *************************************
const { default: verificarLogin } = require('../componentes/verificarLogin');

// *************************   MULTER   *****************************************
// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/imgs/public"); // Diretório para salvar os arquivos
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// **********************   CONFIGURAÇÕES   *************************************
require('dotenv').config();
const router = express.Router();
const secretKey = process.env.SECRET_KEY;
const dados = async () => {
  const data = await fs.promises.readFile("files/db.json", "utf8");
  return JSON.parse(data);
};

// ************************      ROTA       *************************************
router.post('/atualizarfotodeperfil',upload.single("file"), async (req, res) => {
  try {
    const {user, senha} = req.body    
    if(!req.file) return res.status(400).json({msg: 'Nenhuma imagem foi enviada'})

    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      await fs.promises.unlink(req.file.path);
      return res.status(400).json({ msg: 'Extensão de imagem inválida.' });
    }

    const usuarios = await dados()
    const usuarioExiste = await verificarLogin(usuarios, user, senha, secretKey);

    if(!usuarioExiste.login) {
      await fs.promises.unlink(req.file.path).catch((err) =>console.error("Erro ao deletar o arquivo:", err.message));
      return res.status(404).json({msg: 'Usuário sem permissão!!'})
    }
    const usuario = usuarios.find((u) => u.user === user);    
    usuario.foto_perfil = `/assets/imgs/public/${req.file.filename}`
    
    const banco = usuarios.map(x =>(x.user === user)? {...usuario} : {...x})
    const usuarioSeguro = {...usuario,token: usuarioExiste.info.token};
    delete usuarioSeguro.senha;
    delete usuarioSeguro.conteudo;
    delete usuarioSeguro.amigos;
    delete usuarioSeguro.email;    
    
    await fs.promises.writeFile("files/db.json", JSON.stringify(banco), "utf8");
    return res.status(200).json({msg: 'Foto de perfil atualizada com sucesso!!', login: true, info:{...usuarioSeguro}})
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ msg: "Erro interno." });
  }
});

module.exports = router;