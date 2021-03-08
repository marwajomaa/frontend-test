import React, { useEffect, useState } from "react";
import useUser from "../../hooks/user_info";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoggedInUserContext from "../../context/loggedInUser";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase";
import Input from "../../components/Input";

function Landing({ user: loggedInUser }) {
  const history = useHistory();
  const { user } = useUser(loggedInUser.uid);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [userData, setUserData] = useState({});
  const [update, setUpdate] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserData(user);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updateUserObj = {
      userId: userData.userId,
      username: userData.username,
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      token: userData.token,
    };

    if (user.token) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_LOCAL_URL}/api/users/update-user/${user.userId}`,
          updateUserObj,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        const updatedUser = await auth.currentUser.updateProfile({
          updateUserObj,
        });
        setMsg("Update successful");
        setUpdatedUser(updatedUser);
      } catch (err) {
        setError(err.response.data.error);
      }
    }
  };

  useEffect(() => {
    document.title = "Landing page";
  }, []);

  if (loading) return <h1>Loading.....</h1>;
  return (
    <LoggedInUserContext.Provider value={{ updatedUser }}>
      <div>
        {msg && <p>{msg}</p>}
        <button
          onClick={() => {
            auth.signOut();
            localStorage.clear();
            history.push(ROUTES.LOGIN);
          }}
        >
          logout
        </button>
        <button onClick={() => setUpdate(true)}>Update your info</button>
        {update && (
          <div>
            {error && <p>{error}</p>}

            <form onSubmit={handleUserUpdate}>
              <Input
                aria-label="Enter your username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => handleInputChange(e)}
                value={userData.username}
              />
              <Input
                aria-label="Enter your email address"
                name="emailAddress"
                type="email"
                placeholder="Email address"
                onChange={(e) => handleInputChange(e)}
                value={userData.emailAddress}
              />
              <Input
                aria-label="Enter your phone number"
                name="phoneNumber"
                type="text"
                placeholder="Phone number"
                onChange={(e) => handleInputChange(e)}
                value={userData.phoneNumber}
              />
              <Input
                aria-label="Enter your password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
                value={userData.password}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default Landing;
