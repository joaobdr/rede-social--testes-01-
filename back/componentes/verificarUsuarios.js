const verificarUsuarios = (dados, nomeUsuario, senha) => {
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].user === nomeUsuario) {
      if (dados[i].senha === senha) {
        return { login: true, user: dados[i].user };
      } else {
        return { login: false, msg: "Senha inválida" };
      }
    }
  }
  return { login: false, msg: "usuário não encontrado" };
};

export default verificarUsuarios;
