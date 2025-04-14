import React from "react";
import style from "./Post.module.css";
const Post = ({ links, content }) => {
  const dif = () => {
    const ts = Date.now() - content.conteudo.data_post;
    const segundos = Math.floor(ts / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(meses / 12);

    if (anos >= 1) return `há ${anos} ano${anos > 1 ? "s" : ""}`;
    if (meses >= 1) return `há ${meses} mês${meses > 1 ? "es" : ""}`;
    if (semanas >= 1) return `há ${semanas} semana${semanas > 1 ? "s" : ""}`;
    if (dias >= 1) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
    if (horas >= 1) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
    if (minutos >= 1) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    return `há alguns segundos`;
  };

  return (
    <section className={style.post}>
      <div className={style.header_do_post}>
        <figure className={style.foto_de_perfil}>
          <img src={links.base + content.info.foto_perfil} alt="" />
        </figure>
        <div className={style.descricao_do_post}>
          <span className={style.nome_de_usuario}>{content.info.user}</span>
          <div>
            <p className={style.data_post}>{dif()}</p>
          </div>
        </div>
      </div>
      <div className={style.main_post}>
        {content.conteudo.titulo ? (
          <p className={style.titulo_do_post}>{content.conteudo.titulo}</p>
        ) : null}
        <figure className={style.content_post}>
          <img src={links.base + content.conteudo.conteudo} alt="" />
        </figure>
      </div>
      <div className={style.interacao}>
        <div className={style.likes}>
          <img src="/assets/imgs/default/heart.svg" alt="" />
          <span>{content.conteudo.likes.length}</span>
        </div>
      </div>
    </section>
  );
};

export default Post;
