import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Componentes/Login/Login";
import Cadastrar from "./Componentes/Cadastrar/Cadastrar";

const links = {
  login:
    "https://fictional-space-acorn-g4qp4pv94j6q2ppqg-3000.app.github.dev/api/login",
  cad: "https://fictional-space-acorn-g4qp4pv94j6q2ppqg-3000.app.github.dev/api/cadastrar",
};

function App() {
  const [log, setLog] = React.useState(false);
  const [infoUser, setInfoUser] = React.useState(null);

  console.log("informação de usuario = ", infoUser);

  if (log) return <>Tela de usuario</>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login setLog={setLog} links={links} setInfoUser={setInfoUser} />
          }
        />
        <Route
          path="/cadastrar"
          element={
            <Cadastrar
              links={links}
              setLog={setLog}
              setInfoUser={setInfoUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
