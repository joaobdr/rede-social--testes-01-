import style from "./Home.module.css";
const teste = {
  info: { id: 2, email: "123", user: "123", conteudo: Array(0) },
  login: true,
  msg: "Login bem-sucedido",
  token: "",
};

const Home = ({ user }) => {
  console.log(user);

  return <>Pagina do Feed</>;
};
export default Home;
