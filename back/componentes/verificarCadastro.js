import fs from "fs/promises";

const verificarCadastro = async (email, user, senha) => {
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
    resp = {
      info: { ...us, senha: undefined, amigos: undefined, conteudo: undefined },
      msg: "Usuário cadastrado com sucesso!!",
      cadastro: true,
    };
  } catch (err) {
    resp = {
      cadastro: false,
      msg: "Erro ao salvar cadastro, tente mais tarde.",
    };
  }

  return resp;
};

export default verificarCadastro;
