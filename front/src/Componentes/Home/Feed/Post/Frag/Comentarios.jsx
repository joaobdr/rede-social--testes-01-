import React from 'react';
import style from '../Post.module.css'
import Janela from './Janela';

const Comentarios = ({ links, content }) =>{
  const [janela, setJanela] = React.useState(false)

  const handleClick =(e) =>{
    setJanela(!janela)   
  }

  return (
    <>
      {janela ? <Janela content={content} setJanela={setJanela}/> : null}
      <div className={style.comentarios} onClick={handleClick}>
        <svg aria-label="Comentar" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comentar</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
        <span>{content.conteudo.comentarios.length} Comentarios</span>
      </div>
    </>
    )
}

export default Comentarios