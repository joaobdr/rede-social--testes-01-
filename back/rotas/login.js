const express = require('express');
const router = express.Router();
const fs = require("fs");

// **********************   COMPONENTES   *************************************
const  verificarLogin = require('../componentes/verificarLogin');

// **********************   CONFIGURAÇÕES   *************************************
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const dados = async () => {
  const data = await fs.promises.readFile("files/db.json", "utf8");
  return JSON.parse(data);
};

// ************************      ROTA       **************************************
router.post('/login', async (req, res) => {
  try {
    const { user, senha } = req.body;
    if (!user || !senha)return res.status(400).json({ msg: "Usuário e senha são obrigatórios" })
    const resp = await verificarLogin(await dados(), user, senha, secretKey);
  
    return res.status(200).json(resp);
  } catch (err) {
    console.error("Erro ao processar login:", err.message);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
});

module.exports = router;