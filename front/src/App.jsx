import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Componentes/Login/Login";
import Cadastrar from "./Componentes/Cadastrar/Cadastrar";
import Home from "./Componentes/Home/Home";
import Header from "./Componentes/Home/Header/Header";
import Load from "./Componentes/Load/Load";

const init = "https://ominous-train-jj5gjgp6jvjjhwwv-3000.app.github.dev";
const links = {
  base: init,
  login: `${init}/api/login`,
  cad: `${init}/api/cadastrar`,
  update_perfil: `${init}/api/uploadperfil`,
  feed: `${init}/api/feed`,
  token: `${init}/api/validartoken`,
};

function App() {
  const local = localStorage.usuario ? JSON.parse(localStorage.usuario) : null;
  const [log, setLog] = React.useState(false);
  const [infoUser, setInfoUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (local) {
      fetch(`${links.token}?token=${local.token}&id=${local.id}`)
        .then((x) => x.json())
        .then((x) => {
          setLog(x.login);
          setInfoUser(x.info);
          setLoading(false);
        })
        .catch(() => {
          setLog(false);
          setLoading(false);
        });
    } else {
      localStorage.removeItem("usuario");
      setLoading(false);
    }
  }, []);
  if (loading) return <Load />;
  if (log)
    return (
      <BrowserRouter>
        <Header links={links} user={infoUser} />
        <Routes>
          <Route path="/" element={<Home user={infoUser} links={links} />} />
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
