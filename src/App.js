import React from "react";
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AddEntrada, AddSaida, Dashboard, Entrada, Inicio, Login, Movimento, Saida, SignUp, Users } from "./pages";
import SidebarComponent from "./templates/SidebarComponent";


function App() {
  return (
    <>
      <Router>
        <SidebarComponent>
          <Routes>
            <Route path='/' element={<Inicio />} exact />
            <Route path="/movimentos" element={<Movimento />} />
            <Route path="/entradas" element={<Entrada />} />
            <Route path="/entradas/add" element={<AddEntrada />} />
            <Route path="/saidas" element={<Saida />} />
            <Route path="/saidas/add" element={<AddSaida />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/users" element={<Users />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </SidebarComponent>
      </Router>
    </>
  );
}

export default App;
