const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// **********************    COMPONENTES    *************************************
const { default: verificarCadastro } = require('../componentes/verificarCadastro');

// **********************   CONFIGURAÇÕES   *************************************
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// ************************      ROTA       **************************************
router.post('/cadastrar', async (req, res) => {
  const body = req.body;
  if (!body.email || !body.nome || !body.senha) {
    return res.status(400).json({ msg: "Campos obrigatórios faltando." });
  }
  const salt = await bcrypt.genSalt(12);
  const senha = await bcrypt.hash(`${body.senha}`, salt);
  const resp = await verificarCadastro(body.email, body.nome, senha, secretKey);
  return res.status(200).json(resp);
});

module.exports = router;