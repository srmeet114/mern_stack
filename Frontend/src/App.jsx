import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSingup from "./pages/CaptainSingup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import UserProtaectWrapper from "./pages/UserProtaectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSingup />} />
        <Route
          path="/home"
          element={
            <UserProtaectWrapper>
              <Home />
            </UserProtaectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtaectWrapper>
              <UserLogout />
            </UserProtaectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
