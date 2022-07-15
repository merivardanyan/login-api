import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <HashRouter>
          <Routes>
            <Route path="/" element ={<Login />} />
            <Route path="/home" element ={<Home />} />
            <Route path="/signup" element ={<SignUp />} />
          </Routes>
        </HashRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
