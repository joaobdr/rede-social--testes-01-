import React from "react";
import style from "./Geral.module.css";

const InputPerfilFoto = ({ info, imagem, setImagem }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader();
      // Quando o arquivo for carregado, define o URL da imagem no estado
      reader.onloadend = () => setImagem(reader.result); // Definindo a imagem em base64
      reader.readAsDataURL(file); // Converte a imagem para base64
    }
  };

  return (
    <div className={style.foto_perfil_div}>
      <figure className={style.foto_perfil}>
        <img src={imagem ? imagem : info.foto_perfil} alt="" />
      </figure>
      <label htmlFor="trocar_foto" className={style.label_foto}>
        <img src="/assets/imgs/pen.svg" alt="" />
      </label>
      <input
        type="file"
        name="trocar_foto"
        id="trocar_foto"
        accept="image/*"
        onChange={handleImageChange}
        className={style.input_file}
      />
    </div>
  );
};

export default InputPerfilFoto;
