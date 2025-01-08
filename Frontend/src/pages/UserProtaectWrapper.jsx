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
    UserGetProfile(setUser, setLoading, navigate,notifyerr);
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default UserProtaectWrapper;
