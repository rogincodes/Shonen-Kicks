import "../styles.css";
import { useContext, useState, useRef } from "react";
import UserContext from "../context/UserContext";

export default function Login({ loginIsOpen, toggleLogin, renderLogin }) {
  const { user, setUser } = useContext(UserContext);
  const [isGlitching, setIsGlitching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const startYRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setIsGlitching(true);
    const audio = new Audio("./hero-login.mp3");
    setTimeout(() => {
      audio.play();
    }, 200);
    setTimeout(() => {
      setIsGlitching(false), setLoggedIn(true);
    }, 400);
  };

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startYRef.current;

    if (deltaY > 100) {
      // Swipe down detected
      toggleLogin(false); // unmount trigger
    }
  };

  return (
    <div>
      {renderLogin && (
        <>
          <div
            className={`login-backdrop ${loginIsOpen ? "" : "fade-out"}`}
            onClick={() => toggleLogin(false)}
          ></div>
          <div
            className={`login-drawer ${
              loginIsOpen ? "login-slide-up" : "login-slide-down"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {loggedIn ? (
              <div className="logged-in">
                <img
                  src="./logos/shonenkicks.png"
                  alt="Shonen Kicks"
                  className="login-logo"
                />
                <h2 className="logged-title">Welcome, {user}!</h2>
                <p>
                  Your next legendary pair awaits. Step into the world of Shonen
                  Kicks.
                </p>
              </div>
            ) : (
              <div className={`${isGlitching ? "glitch" : ""}`}>
                <div className="login-header">
                  <h2 className="login-title">Your first step to glory.</h2>
                  <p className="login-sub">
                    Totally fake login. Looks cool though.
                  </p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                  <label htmlFor="username" className="login-label">
                    Username
                  </label>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    id="username"
                    name="username"
                    required
                    className="login-input"
                    placeholder="e.g. piratekingluffy"
                    autoComplete="username"
                  />
                  <p className="login-terms">
                    By continuing, I pledge to follow the Way of Privacy and the
                    Warrior’s Code.
                  </p>
                  <button type="submit" className="login-button">
                    Continue
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
