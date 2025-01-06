import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

export const SinupUser = async (
  Sinupdata,
  reset,
  navigate,
  notify,
  notifyerr
) => {
  try {
    const response = await axios.post(`${url}/users/register`, Sinupdata);
    navigate("/login");
    notify(response.data.message);
    localStorage.setItem("token", response.data.token);
    reset();
  } catch (err) {
    console.log(err);
    notifyerr(err.response?.data.errors || err.message);
  }
};

export const SinInUser = async (
  Sinindata,
  notify,
  notifyerr,
  reset,
  navigate,
  setUser
) => {
  try {
    const response = await axios.post(`${url}/users/login`, Sinindata);
    navigate("/home");
    notify(response.data.message);
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    reset();
  } catch (err) {
    console.log(err);
    notifyerr(err.response?.data.errors || err.message);
  }
};

export const LogoutUser = async () => {
  axios
    .get(`${url}/users/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
      }
    });
};

export const CaptainsRegister = async (
  reset,
  Data,
  navigate,
  notify,
  notifyerr,
  setCaptain
) => {
  try {
    const response = await axios.post(`${url}/captains/register`, Data);
    localStorage.setItem("token", response.data.token);
    setCaptain(response.captain);
    notify(response.data.message);
    navigate("/captain-login");
    reset();
    notifyerr(err.response?.data.errors || err.message);
  } catch (err) {
    console.log(err);
  }
};

export const CaptainsLogin = async (
  reset,
  Data,
  navigate,
  notify,
  notifyerr
) => {
  try {
    const response = await axios.post(`${url}/captains/login`, Data);
    localStorage.setItem("token", response.data.token);
    notify(response.data.message);
    navigate("/captain-home");
    reset();
  } catch (err) {
    console.log(err);
    notifyerr(err.response?.data.errors || err.message);
  }
};

export const CaptainGetProfile = async (setCaptain, setLoading, navigate) => {
  try {
    const response = await axios.get(`${url}/captains/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    setLoading(false);
    setCaptain(response.data.captain);
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    navigate("/captain-login");
  } finally {
    setLoading(false);
  }
};

export const UserGetProfile = async (setUser, setLoading) => {
  try {
    const response = await axios.get(`${url}/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response);
    setUser(response.data.user);
    setLoading(false);
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    navigate("captain-login");
  }
};
