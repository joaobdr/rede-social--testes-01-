import React from "react";
import Input from "../Login/Forms/Input";
import style from "./Cadastrar.module.css";
// nome, tipo, valor, setValor
const Cadastrar = ({ links, setLog, setInfoUser }) => {
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [repetirSenha, setRepetirSenha] = React.useState("");
  const [resp, setResp] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(senha === repetirSenha))
      return setResp({ ...resp, msg: "Senhas não são iguais!" });

    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nome, senha }),
    };
    const js = await fetch(links.cad, body);
    const ts = await js.json();

    setResp(ts);
    setLog(ts.cadastro);
    setInfoUser(ts.usuario);
  };

  console.log(resp);
  return (
    <main className={style.main}>
      <section className={style.section}>
        <h2 className={style.titulo}>Cadastrar</h2>

        <form className={style.form} onSubmit={handleSubmit}>
          <Input nome="Email" tipo="text" valor={email} setValor={setEmail} />
          <Input nome="Usuário" tipo="text" valor={nome} setValor={setNome} />
          <Input
            nome="Senha"
            tipo="password"
            valor={senha}
            setValor={setSenha}
          />
          <Input
            nome="repetir senha"
            tipo="password"
            valor={repetirSenha}
            setValor={setRepetirSenha}
          />

          {resp ? <span className={style.span}>{resp.msg}</span> : null}

          <button className={style.btn_cadastrar}>Me cadastrar</button>
        </form>
      </section>
    </main>
  );
};

export default Cadastrar;
