import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const verificarLogin = async (dados, nomeUsuario, senha, secretKey) => {
  const usuario = dados.find((u) => u.user === nomeUsuario);

  if (!usuario) return { login: false, msg: "Usuário não encontrado" };

  const check = await bcrypt.compare(senha, usuario.senha);
  if (!check) return { login: false, msg: "Senha incorreta" };
  else {
    // const token = criarToken(dados, usuario.id);
    const token = jwt.sign({ id: usuario.id, user: usuario.user }, secretKey, {
      expiresIn: "24h",
    });

    return {
      login: true,
      msg: "Login bem-sucedido",
      info: {
        ...usuario,
        senha: undefined,
        amigos: undefined,
        conteudo: undefined,
        token,
      },
    };
  }
};

export default verificarLogin;
