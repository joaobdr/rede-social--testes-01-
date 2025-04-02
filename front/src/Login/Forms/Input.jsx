import style from "../Login.module.css";
const Input = ({ nome, tipo, valor, setValor }) => {
  return (
    <>
      <div className={style.input}>
        <label htmlFor={nome}>{nome}</label>
        <input
          type={tipo}
          name={nome}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
