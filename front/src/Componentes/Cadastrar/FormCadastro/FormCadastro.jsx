import React from "react";
import { Link } from "react-router-dom";
import Input from "../../Login/Forms/Input";
import style from "./FormCadastro.module.css";
import Load from "../../Load/Load";

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
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [load, setLoad] = React.useState(null);

  const validarCampos = () => {
    if (!email || !nome || !senha || !confirmarSenha) {
      setResp({ msg: "Preencha todos os campos!" });
      return false;
    }
    if (senha !== confirmarSenha) {
      setResp({ msg: "Senhas não são iguais!" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (!validarCampos()) return setLoad(false);

    try {
      const res = await fetch(links.cad, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome, senha }),
      });
      const data = await res.json();

      setLoad(false);
      setResp(data);
      setInfoUser(data.info);
    } catch (err) {
      console.error("erro ==== ", err);
      setResp({ msg: "Erro ao cadastrar. Tente novamente." });
      setLoad(false);
    }
  };

  return (
    <>
      <h2 className={style.titulo}>Cadastrar</h2>
      {load ? <Load /> : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <Input nome="Email" tipo="text" valor={email} setValor={setEmail} />
        <Input nome="Usuário" tipo="text" valor={nome} setValor={setNome} />
        <Input nome="Senha" tipo="password" valor={senha} setValor={setSenha} />
        <Input
          nome="Confirmar Senha"
          tipo="password"
          valor={confirmarSenha}
          setValor={setConfirmarSenha}
        />

        {resp?.msg && <span className={style.span}>{resp.msg}</span>}
        <div className={style.btns}>
          <Link to="/">Voltar</Link>
          <button className={style.btn_cadastrar}>Próximo</button>
        </div>
      </form>
    </>
  );
};

export default FormCadastro;
