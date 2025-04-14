const express = require("express");
const cors = require("cors");
require('dotenv').config();

// **************************   ROTAS   *****************************************
const feed = require('./rotas/feed');
const login = require('./rotas/login')
const validarToken = require('./rotas/validarToken')
const cadastrar = require('./rotas/cadastrar')
const uploadFotoDePerfil = require('./rotas/uploadFotoDePerfil')
const rotaBase = require('./rotas/rotaBase')

// **********************   CONFIGURAÇÕES   *************************************
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/assets", express.static("assets"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// **************************   ROTAS   *****************************************
app.use('/api', login);
app.use('/api', validarToken);
app.use('/api', cadastrar);
app.use('/api', uploadFotoDePerfil);
app.use('/api', feed);
app.use('/', rotaBase);

if (require.main === module) {
  app.listen(port, () => console.log(`Servidor rodando: http://localhost:${port}`));
}