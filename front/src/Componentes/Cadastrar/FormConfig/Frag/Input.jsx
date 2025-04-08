import style from "./Geral.module.css";
import React from "react";

const Input = ({ valor, setValor, desc }) => {
  return (
    <div className={style.input}>
      <label htmlFor="descrição_perfil">Descrição do perfil: </label>
      <textarea
        name="descrição_perfil"
        id="descrição_perfil"
        valor={valor}
        onChange={(e) => setValor(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Input;
