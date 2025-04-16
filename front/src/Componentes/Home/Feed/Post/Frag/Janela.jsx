import style from './Janela.module.css'
import React from 'react';


const Janela = ({content, setJanela}) =>{
  const [loading, setLoading] = React.useState(true)
  console.log(content);
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  return (
    <div className={style.main}>
      <svg onClick={()=>setJanela(false)} aria-label="Fechar" className={`x1lliihq x1n2onr6 x9bdzbf ${style.svg}`} fill="#f5f5f5" role="img" viewBox="0 0 24 24" ><title>Fechar</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
      <div className={`container ${style.box_content}`}>
        {loading ? <div className={style.loading}><div></div></div> :  null}
      </div>
    </div>
  )
}

export default Janela