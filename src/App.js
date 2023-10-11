import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AddSaida, Entrada, Inicio, Movimento, Saida } from "./pages";
import AddEntrada from "./pages/Entrada/AddEntrada";
import SidebarComponent from "./templates/SidebarComponent";

function App() {
  return (
    <>
      <Router>
        <SidebarComponent>
          <Routes>
            <Route path="/" element={<Inicio />} exact />
            <Route path="/movimentos" element={<Movimento />} />
            <Route path="/entradas" element={<Entrada />} />
            <Route path="/entradas/add" element={<AddEntrada />} />
            <Route path="/saidas" element={<Saida />} />
            <Route path="/saidas/add" element={<AddSaida />} />
          </Routes>
        </SidebarComponent>
      </Router>
    </>
  );
}

export default App;
