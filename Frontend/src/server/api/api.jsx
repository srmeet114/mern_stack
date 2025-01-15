import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

export const SinupUser = async (
  Sinupdata,
  reset,
  navigate,
  notify,
  notifyerr,
  setUser
) => {
  try {
    const response = await axios.post(`${url}/users/register`, Sinupdata);
    notify(response.data.message);
    setUser(response.data.user)
    localStorage.setItem("token", response.data.token);
    reset();
    navigate("/login");
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
    notify(response.data.message);
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    reset();
    navigate("/home");
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
    navigate("/captain-home");
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
  notifyerr,
  setCaptain
) => {
  try {
    const response = await axios.post(`${url}/captains/login`, Data);
    localStorage.setItem("token", response.data.token);
    setCaptain(response.data.captain);
    notify(response.data.message);
    navigate("/captain-home");
    reset();
  } catch (err) {
    console.log(err);
    notifyerr(err.response?.data.errors || err.message);
  }
};

export const LogoutCaptain = async () => {
  axios
    .get(`${url}/captains/logout`, {
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

export const CaptainGetProfile = async (setCaptain, setLoading, navigate) => {
  try {
    const response = await axios.get(`${url}/captains/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCaptain(response.data);
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    navigate("/captain-login");
  } finally {
    setLoading(false);
  }
};

export const UserGetProfile = async (setUser, setLoading, navigate,notifyerr) => {
  try {
    const response = await axios.get(`${url}/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(response.data);
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    notifyerr(err.message)
    navigate("/login");
  }finally {
    setLoading(false);
  }
};

export const FindTrips = async (pickup,destination,setFare) =>{

  try {
    const response = await axios.get(`${url}/rides/get-fare/${pickup}/${destination}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(response.data);
    setFare(response.data)
  } catch (err) {
    console.log(err);
  }
}

export const createRides = async (pickup,destination,vehicleType) =>{
  try {
    const response = await axios.post(`${url}/rides/create`,{pickup,destination,vehicleType},{headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }})
    console.log(response);
    
  }catch (err) {
    console.log(err);
  }
}