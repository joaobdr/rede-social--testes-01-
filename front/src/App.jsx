import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Login from "./Login/Login";

function App() {
  const [log, setLog] = React.useState(false);

  if (log) return <>Tela de usuario</>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLog={setLog} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
