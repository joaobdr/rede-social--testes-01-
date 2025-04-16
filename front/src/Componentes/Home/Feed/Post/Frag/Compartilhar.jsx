import style from '../Post.module.css'

const Compartilhar = ({ content })=>{

  return(
    <div className={style.likes}>
      <svg aria-label="Compartilhar" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Compartilhar</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
      <span>{content.conteudo.likes.length} compartilhamentos</span>
    </div>
  )
}


export default Compartilhar