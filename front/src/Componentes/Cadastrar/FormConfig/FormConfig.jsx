import InputPerfilFoto from "./Frag/InputPerfilFoto";
import style from "./FormConfig.module.css";
import Input from "./Frag/Input";
import React from "react";

const FormConfig = ({ links, info, nome, senha }) => {
  const [descricao, setDescrica] = React.useState("");
  const [imagem, setImagem] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imagem) {      
      const base64File = imagem.split(",")[1]; // Extrai apenas a parte base64 do resultado


      console.log('base64File =', base64File);
      
      const body = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, senha, imagem: base64File }),
      };

      console.log(body);
      
      const js = await fetch(links.update_perfil, body);
      const ts = await js.json();

      console.log(ts);
    } else {
      console.log(
        "nenhuma imagem selecionada, permanecendo com foto de perfil padrao"
      );
    }
  };

  return (
    <form className={style.form}>
      <InputPerfilFoto info={info} imagem={imagem} setImagem={setImagem} />
      <h4 className={style.nomeUsuario}>{info.user}</h4>

      <Input valor={descricao} setValor={setDescrica} />

      <div className={style.btns}>
        <button className={style.btn_finalizar} onClick={handleSubmit}>
          Finalizar
        </button>
      </div>
    </form>
  );
};

export default FormConfig;
