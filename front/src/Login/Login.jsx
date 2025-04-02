import Input from "./Forms/Input";
import style from "./Login.module.css";
import React from "react";

const link = "https://studious-journey-g4qp4pv94px9c9vj7-3000.app.github.dev/";
const ts = { mensagem: "mensagem de teste" };

const Login = ({ setLog }) => {
  const [user, setUser] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(link, {
      Method: "POST",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      Body: ts,
      Cache: "default",
    })
      .then((x) => x.json())
      .then((x) => console.log(x));
  };

  return (
    <>
      <main className={style.main}>
        <section className={style.login}>
          <h4 className={style.titulo}>Login</h4>

          <form onSubmit={handleSubmit} className={style.form_login}>
            <Input nome="Usuário" tipo="text" valor={user} setValor={setUser} />

            <Input
              nome="Senha"
              tipo="password"
              valor={senha}
              setValor={setSenha}
            />

            <div className={style.cadastro_e_senha}>
              <a href="#">Esqueci a senha</a>
              <a href="#">Quero me cadastrar</a>
            </div>

            <button className={style.btn_form}>Entrar</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
