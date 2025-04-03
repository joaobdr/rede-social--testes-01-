import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Componentes/Login/Login";
import Cadastrar from "./Componentes/Cadastrar/Cadastrar";

const links = {
  login: "https://cuddly-trout-g4qp4pv94wg43wpqg-3000.app.github.dev/api/login",
  cad: "https://cuddly-trout-g4qp4pv94wg43wpqg-3000.app.github.dev/api/cadastrar",
};

function App() {
  const [log, setLog] = React.useState(false);

  if (log) return <>Tela de usuario</>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLog={setLog} links={links} />} />
        <Route path="/cadastrar" element={<Cadastrar links={links} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
