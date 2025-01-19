import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGetProfile } from "../server/api/api";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

const UserProtaectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const notifyerr = (message) => toast.error(message);

  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    UserGetProfile(setUser, setLoading, navigate, notifyerr);
  }, [token]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#000]" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default UserProtaectWrapper;
