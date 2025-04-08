import { Link, Links } from "react-router-dom";
import Input from "./Forms/Input";
import style from "./Login.module.css";
import React from "react";

const Login = ({ setLog, links, setInfoUser }) => {
  const [user, setUser] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [res, setRes] = React.useState("");
  const [btn, setBtn] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtn(true);
    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, senha }),
    };
    const js = await fetch(links.login, body);
    const ts = await js.json();
    setRes(ts);
    console.log(ts);

    if (ts.login) setLog(true);
    setInfoUser({ ...ts.info });
    return setBtn(false);
  };

  console.log(res);

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
              <Link to="/#">Esqueci a senha</Link>
              <Link to="/cadastrar">Quero me cadastrar</Link>
            </div>

            {res ? (
              <span className={`${style.mensagem_erro}`}>{res.msg}!!</span>
            ) : null}

            <button className={style.btn_form + ` ${btn ? style.opac : ""}`}>
              Entrar
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
