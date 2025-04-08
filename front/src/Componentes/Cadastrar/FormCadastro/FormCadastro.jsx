import Input from "../../Login/Forms/Input";
import style from "./FormCadastro.module.css";
import React from "react";
import { Link } from "react-router-dom";

const FormCadastro = ({
  resp,
  setResp,
  links,
  setInfoUser,
  nome,
  setNome,
  senha,
  setSenha,
}) => {
  const [email, setEmail] = React.useState("");
  const [repetirSenha, setRepetirSenha] = React.useState("");
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
    // setLog(ts.cadastro);
    setInfoUser(ts.usuario);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input nome="Email" tipo="text" valor={email} setValor={setEmail} />
      <Input nome="Usuário" tipo="text" valor={nome} setValor={setNome} />
      <Input nome="Senha" tipo="password" valor={senha} setValor={setSenha} />
      <Input
        nome="repetir senha"
        tipo="password"
        valor={repetirSenha}
        setValor={setRepetirSenha}
      />

      {resp ? <span className={style.span}>{resp.msg}</span> : null}
      <div className={style.btns}>
        <Link to="/">Voltar</Link>
        <button className={style.btn_cadastrar}>Próximo</button>
      </div>
    </form>
  );
};

export default FormCadastro;
