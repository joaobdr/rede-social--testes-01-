import React from "react";
import { useNavigate } from "react-router-dom";
import InputPerfilFoto from "./Frag/InputPerfilFoto";
import style from "./FormConfig.module.css";
import Load from "../../Load/Load";

const FormConfig = ({ links, info, user, senha, setLog, setInfoUser }) => {
  const [imagem, setImagem] = React.useState(null);
  const [mensagem, setMensagem] = React.useState(null);
  const [load, setLoad] = React.useState(null);
  const navigate = useNavigate();

  const atualizarEstadoUsuario = ({ login, info, msg }) => {
    setMensagem(msg);
    setLog(login);
    setInfoUser(info);
    navigate("/");
    setLoad(false);
  };

  const enviarComImagem = async () => {
    const formData = new FormData();
    formData.append("file", imagem);
    formData.append("user", user);
    formData.append("senha", senha);

    const response = await fetch(links.update_perfil, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    atualizarEstadoUsuario(data);
  };

  const enviarSemImagem = async () => {
    const response = await fetch(links.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, senha }),
    });

    const data = await response.json();
    atualizarEstadoUsuario(data);
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    imagem ? await enviarComImagem() : await enviarSemImagem();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {load ? <Load /> : null}
      <InputPerfilFoto info={info} imagem={imagem} setImagem={setImagem} />
      <h4 className={style.nomeUsuario}>{info.user}</h4>
      <span className={style.mensagem_erro}>{mensagem}</span>
      <div className={style.btns}>
        <button type="submit" className={style.btn_finalizar}>
          Finalizar
        </button>
      </div>
    </form>
  );
};

export default FormConfig;
