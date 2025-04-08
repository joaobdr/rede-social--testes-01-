import bcrypt from "bcrypt";
const verificarLogin = async (dados, nomeUsuario, senha) => {
  const usuario = dados.find((u) => u.user === nomeUsuario);
  var resp;

  if (!usuario) {
    return (resp = { login: false, msg: "Usuário não encontrado" });
  }

  const check = await bcrypt.compare(senha, usuario.senha);
  if (!check) resp = { login: false, msg: "Senha incorreta" };
  else
    resp = {
      login: true,
      msg: "Login bem-sucedido",
      token: "",
      info: { ...usuario, senha: undefined },
    };

  return resp;
};

export default verificarLogin;
