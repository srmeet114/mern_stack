import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProtaectWrapper from "./pages/UserProtaectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import UserLogout from "./pages/UserLogout";

const Start = lazy(() => import("./pages/User/Start"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserSignup = lazy(() => import("./pages/UserSignup"));
const CaptainLogin = lazy(() => import("./pages/CaptainLogin"));
const CaptainSingup = lazy(() => import("./pages/CaptainSingup"));
const Home = lazy(() => import("./pages/User/Home"));
const CaptainHome = lazy(() => import("./pages/Captain/CaptainHome"));
const Riding = lazy(() => import("./pages/Riding"));
const CaptainRiding = lazy(() => import("./pages/Captain/CaptainRiding"));

const Loader = () => <div className='flex justify-center'>
  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#000]" />
</div>;

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
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
            path="/riding"
            element={
              <UserProtaectWrapper>
                <Riding />
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
          <Route
            path="/captainriding"
            element={
              <CaptainProtectWrapper>
                <CaptainRiding />
              </CaptainProtectWrapper>
            }
          />
        </Routes>
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default App;
