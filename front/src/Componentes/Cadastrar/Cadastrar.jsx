import React from "react";
import FormConfig from "./FormConfig/FormConfig";
import style from "./Cadastrar.module.css";
import FormCadastro from "./FormCadastro/FormCadastro";

const Cadastrar = ({ links, setLog, setInfoUser }) => {
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [resp, setResp] = React.useState({});

  return (
    <main className={style.main}>
      <section className={style.section}>
        {resp.cadastro ? (
          <FormConfig
            links={links}
            info={resp.info}
            user={nome}
            senha={senha}
            setLog={setLog}
            setInfoUser={setInfoUser}
          />
        ) : (
          <FormCadastro
            resp={resp}
            setResp={setResp}
            links={links}
            setInfoUser={setInfoUser}
            nome={nome}
            setNome={setNome}
            senha={senha}
            setSenha={setSenha}
          />
        )}
      </section>
    </main>
  );
};

export default Cadastrar;
