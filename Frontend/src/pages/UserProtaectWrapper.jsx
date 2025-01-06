import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserGetProfile } from "../server/api/api";
import { UserDataContext } from "../context/UserContext";

const UserProtaectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const { loading, setLoading } = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return null;
    }
  }, [token]);

  UserGetProfile(setUser,setLoading,navigate)
  

  return <div>{children}</div>;
};

export default UserProtaectWrapper;
