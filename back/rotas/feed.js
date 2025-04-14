const express = require('express');
const fs = require('fs')
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// **********************   CONFIGURAÇÕES   *************************************
const dados = async () => {
  const data = await fs.promises.readFile("files/db.json", "utf8");
  return JSON.parse(data);
};

// ************************      ROTA       *************************************
router.get('/feed', async (req, res) => {
  const { token, id, pag } = req.headers;

  if (!(token && id && pag)) {
    return res.status(400).json({ msg: 'Usuário ou token inválido!' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (`${decoded.id}` !== `${id}`) {
      return res.status(403).json({
        login: false,
        msg: "ID do token não corresponde ao ID fornecido",
      });
    }

    const usuarios = await dados();
    const us = usuarios.find((u) => `${u.id}` === `${decoded.id}`);
    if (!us) return res.status(404).json({ msg: "Usuário não encontrado" });

    // const conteudo = usuarios
    // .filter(u => us.amigos.includes(`${u.id}`))
    // .filter(u => u.conteudo && u.conteudo.length > 0)
    // .flatMap(u =>
    //   u.conteudo.map(x => ({
    //     info: {
    //       ...x,
    //       senha: undefined,
    //       email: undefined,
    //       conteudo: undefined
    //     },
    //     conteudo: u.conteudo // ou x, se for apenas o post atual
    //   }))
    // );
    // const dadosOrdenados = conteudo.sort((a, b) => b.data_post - a.data_post);

    const teste = [];

    for (let i = 0; i < usuarios.length; i++) {
      for (let j = 0; j < us.amigos.length; j++) {        
        const element = us;
        if(element.amigos[j] === `${usuarios[i].id}`){
          for (let k = 0; k < usuarios[i].conteudo.length; k++) {
            teste.push({info:{
              ...usuarios[i],
              email: undefined,
              senha: undefined,
              conteudo: undefined,
              amigos: undefined,
            },
          conteudo:{
            ...usuarios[i].conteudo[k]
          }})
            
          }
        }
      }
            
    }
    const dadosOrdenados = teste.sort((a, b) => b.conteudo.data_post - a.conteudo.data_post);
    
    return res.status(200).json(teste);

  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Token inválido" });
  }
});

module.exports = router;