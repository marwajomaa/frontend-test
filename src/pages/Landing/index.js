import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/user_info";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase";
import Input from "../../components/Input";
import logo from "../../assets/jereer-logo.png";
import Button from "../../components/Button";
import "./style.css";

function Landing({ user: loggedInUser }) {
  const history = useHistory();
  const { user } = useUser(loggedInUser.uid);
  const [userData, setUserData] = useState({});
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        const res = await axios.patch(
          `${process.env.REACT_APP_LOCAL_URL}/api/users/update-user/${user.userId}`,
          updateUserObj,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        if (res) {
          setMsg("Your info updated successfully");
        }
        const currentUser = auth.currentUser;
        await currentUser.updateEmail(userData.emailAddress);
        await currentUser.updatePassword(userData.password);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Landing page";
  }, []);

  if (loading)
    return (
      <Skeleton
        count={2}
        width={1110}
        height={400}
        style={{ marginBottom: "4px" }}
      />
    );
  return (
    <div>
      <div>
        <header>
          <nav>
            <a href="#home" className="navItem">
              <img
                src={logo}
                alt="Jereer logo"
                style={{ width: "60px", height: "60px" }}
              />
            </a>
            <div class="navMenu">
              <a href="#home" className="homeNavItem navItem">
                Home
              </a>
              <a href="#about" className="aboutNavItem navItem">
                About Us
              </a>
              <a href="#services" className="servicesNavItem navItem">
                Services
              </a>
              <a href="#update" className="updateNavItem navItem">
                Update Your Info
              </a>
              <a href="#contact" className="contactNavItem navItem">
                Contact
              </a>
            </div>
            <a href="#logout" className="contactNavItem navItem">
              <Button
                onClick={() => {
                  auth.signOut();
                  localStorage.clear();
                  history.push(ROUTES.LOGIN);
                }}
                color="primary"
                text="Logout"
                variant="outlined"
                style={{
                  width: "100px",
                  borderRadius: "8px",
                  color: "white",
                  backgroundColor: "none",
                }}
                className="logout-btn"
              />
            </a>
          </nav>
        </header>
        <main>
          <section class="home" id="home">
            <div className="hero-section">
              <div className="hero-container">
                <h1>Work, Collaborate, Win.</h1>
                <p>
                  Jereer is SaSS based product, it is a fast progressing retail
                  analysis startup that target small to midsize retail companies
                  to help them analyze and understand their customers data.
                </p>
                <Button
                  color="red"
                  text="More Info"
                  variant="contained"
                  style={{
                    width: "150px",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    right: "45%",
                    bottom: "10%",
                    backgroundColor: "red",
                  }}
                  href="#about"
                />
              </div>
            </div>
          </section>
          <section className="about" id="about">
            <div className="about-container">
              <div className="about-left">
                <h1>Who are we?</h1>
                <p>
                  Jereer is SaSS based product, it is a fast progressing retail
                  analysis startup that target small to midsize retail companies
                  to help them analyze and understand their customers data.
                </p>
              </div>
              <div className="about-right">
                <div className="about-imgWrapper">
                  <img
                    src={logo}
                    alt="jereer logo"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="update" id="update">
            <h1>Want to update Your Data?</h1>
            <div className="update-content-wrapper">
              <div className="update-form">
                {error && <p>{error}</p>}
                {msg && <p>{msg}</p>}

                <form onSubmit={handleUserUpdate}>
                  <div className="input-div">
                    <Input
                      aria-label="Enter your username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleInputChange(e)}
                      value={userData.username}
                    />
                  </div>
                  <div className="input-div">
                    <Input
                      aria-label="Enter your email address"
                      name="emailAddress"
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => handleInputChange(e)}
                      value={userData.emailAddress}
                    />
                  </div>
                  <div className="input-div">
                    <Input
                      aria-label="Enter your phone number"
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone number"
                      onChange={(e) => handleInputChange(e)}
                      value={userData.phoneNumber}
                    />
                  </div>
                  <div className="input-div">
                    <Input
                      aria-label="Enter your password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handleInputChange(e)}
                      value={userData.password}
                    />
                  </div>
                  <div className="input-div">
                    <Button
                      onClick={handleUserUpdate}
                      color="primary"
                      text="Update"
                      variant="contained"
                      style={{
                        width: "100%",
                        height: "50px",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Landing;
