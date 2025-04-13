import fs from "fs/promises";
import jwt from "jsonwebtoken";

const verificarCadastro = async (email, user, senha, secretKey) => {
  const db = JSON.parse(await fs.readFile("files/db.json", "utf8"));
  let resp = { cadastro: false, msg: "Erro no cadastro, tente mais tarde." };

  for (let i = 0; i < db.length; i++) {
    if (db[i].user === user) return { ...resp, msg: "Usuário já cadastrado!!" };
    if (db[i].email === email) return { ...resp, msg: "Email já cadastrado!!" };
  }

  const us = {
    id: db.length + 1,
    email,
    user,
    senha,
    foto_perfil: "/assets/imgs/default/default.svg",
    amigos: [],
    conteudo: [],
  };

  db.push(us);

  try {
    await fs.writeFile("files/db.json", JSON.stringify(db, null, 2), "utf8");
    const token = jwt.sign({ id: us.id, user: us.user }, secretKey, {
      expiresIn: "24h",
    });
    return resp = {
      info: { id: us.id, user: us.user, foto_perfil: us.foto_perfil, token },
      msg: "Usuário cadastrado com sucesso!!",
      cadastro: true,
    };
  } catch (err) {
    console.log("erro ==", err);

    return resp = {
      cadastro: false,
      msg: "Erro ao salvar cadastro, tente mais tarde.",
    };
  }
};

export default verificarCadastro;
