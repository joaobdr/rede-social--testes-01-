const express = require('express');
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");

// **********************   CONFIGURAÇÕES   *************************************
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const dados = async () => {
  const data = await fs.promises.readFile("files/db.json", "utf8");
  return JSON.parse(data);
};
// ************************      ROTA       *************************************
router.get('/validartoken', async (req, res) => {
  const idToken = req.query.id;
  const token = req.query.token;

  if (!token) return res.status(401).json({ login: false, msg: "Token não fornecido" });
  try {
    const decoded = jwt.verify(token, secretKey);    
    const usuarios = await dados(); // Espera o JSON ser carregado
    const us = usuarios.find((u) => u.id === decoded.id); // Agora sim, pode usar find()

    if (!(`${decoded.id}` === idToken))return res.status(403).json({login: false,msg: "ID do token não corresponde ao ID fornecido",})

    const { id, foto_perfil, user } = us;
    return res.json({login: true, info: { id, foto_perfil, user, token }});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ login: false, msg: "Token inválido" });
  }
});

module.exports = router;