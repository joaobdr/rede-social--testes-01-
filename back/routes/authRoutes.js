const express = require("express");
const router = express.Router();
const {
  login,
  cadastrar,
  validarToken,
} = require("../controllers/authController");

// Rota de login
router.post("/login", login);

// Rota de cadastro
router.post("/cadastrar", cadastrar);

// Rota de validação de token
router.get("/validartoken", validarToken);

module.exports = router;
