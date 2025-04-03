import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Login from "./Componentes/Login/Login";
import Cadastrar from "./Componentes/Cadastrar/Cadastrar";

function App() {
  const [log, setLog] = React.useState(false);

  if (log) return <>Tela de usuario</>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLog={setLog} />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
