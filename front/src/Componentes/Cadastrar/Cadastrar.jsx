import React from "react";
import Input from "../Login/Forms/Input";
import style from "./Cadastrar.module.css";
// nome, tipo, valor, setValor
const Cadastrar = () => {
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [repetirSenha, setRepetirSenha] = React.useState("");
  return (
    <main className={style.main}>
      <section className={style.section}>
        <h2 className={style.titulo}>Cadastrar</h2>

        <form className={style.form}>
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

          <button className={style.btn_cadastrar}>Me cadastrar</button>
        </form>
      </section>
    </main>
  );
};

export default Cadastrar;
