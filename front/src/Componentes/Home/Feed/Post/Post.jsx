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
          <svg aria-label="Curtir" class="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Curtir</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
          <span>{content.conteudo.likes.length} Likes</span>
        </div>

        <div className={style.comentarios}>
          <svg aria-label="Comentar" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comentar</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
          <span>{content.conteudo.comentarios.length} Comentarios</span>
        </div>

        <div className={style.likes}>
        <svg aria-label="Compartilhar" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Compartilhar</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
          <span>{content.conteudo.likes.length} compartilhamentos</span>
        </div>
      </div>
    </section>
  );
};

export default Post;
