import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Componentes/Login/Login";
import Cadastrar from "./Componentes/Cadastrar/Cadastrar";
import Home from "./Componentes/Home/Home";
import Header from "./Componentes/Home/Header/Header";

const links = {
  login:
    "https://laughing-halibut-x5g6qppg4r2pqvr-3000.app.github.dev/api/login",
  cad: "https://laughing-halibut-x5g6qppg4r2pqvr-3000.app.github.dev/api/cadastrar",
  update_perfil:
    "https://laughing-halibut-x5g6qppg4r2pqvr-3000.app.github.dev/api/uploadperfil",
};

function App() {
  const [log, setLog] = React.useState(false);
  const [infoUser, setInfoUser] = React.useState(null);

  // if (log)
  if (log)
    return (
      <BrowserRouter>
        <Header user={infoUser} />
        <Routes>
          <Route path="/" element={<Home user={infoUser} />} />
        </Routes>
      </BrowserRouter>
    );

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
