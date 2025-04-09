import fs from "fs";

const verificarCadastro = (email, user, senha) => {
  const db = JSON.parse(fs.readFileSync("files/db.json", "utf8"));
  var resp = { cadastro: false, msg: "Erro não cadastro, tente mais tarde." };

  for (let i = 0; i < db.length; i++) {
    if (db[i].user == user) return { ...resp, msg: "Usuário já cadastrado!!" };
    if (db[i].email == email) return { ...resp, msg: "Email já cadastrado!!" };
  }

  const us = {
    id: db.length + 1,
    email,
    user,
    senha,
    foto_perfil: "/assets/imgs/default/default.svg",
    conteudo: [],
  };
  db.push(us);

  console.log("sdf");

  fs.writeFile("files/db.json", JSON.stringify(db), "utf8", (err) => {
    if (err)
      resp = { cadastro: false, msg: "Erro no cadastro, tente mais tarde." };
  });
  resp = {
    info: { ...us, senha: undefined, id: undefined },
    toke: "",
    msg: "Usuário cadastrado com sucesso!!",
    cadastro: true,
  };

  return resp;
};

export default verificarCadastro;
