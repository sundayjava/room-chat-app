import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Chats from "./components/Chats";

const App = () => {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/chats" element={<Chats />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
