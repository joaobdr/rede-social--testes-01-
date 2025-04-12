import jwt from "jsonwebtoken";

const criarToken = (dados, id) => {
  // Chave secreta (mantenha isso em segredo no ambiente de produção!)
  // Dados que você quer codificar no token
  const usuario = dados.find((u) => u.user === nomeUsuario);

  const secretKey = "sua-chave-secreta";
  const token = jwt.sign(usuario, secretKey, { expiresIn: "24h" });

  console.log("token = ", token);
  return token;
};

export default criarToken;
