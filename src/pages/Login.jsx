import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../components/Button";
import Logo from "../components/Logo";
import useUser from "../contexts/userContext";
import login, { googleSignin } from "../services/Auth/apiLogin";
import signup from "../services/Auth/apiSignup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [loginPressed, setLoginPressed] = useState(false);
  const [attribute, setAttribute] = useState(false);
  const navigate = useNavigate();

  const { userIsAuthentic, userIsLoading, dispatchUser } = useUser();

  useEffect(
    function () {
      if (userIsAuthentic) {
        navigate("/app", { replace: true });
      }
    },
    [userIsAuthentic, navigate]
  );

  function iconClick() {
    setAttribute((attrib) => !attrib);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
    setLoginPressed(true);
    login({ email, password }, dispatchUser);
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!email || !password || !name) return;
    setLoginPressed(true);
    signup({ name, email, password }, dispatchUser);
  }

  function toggleReg() {
    setRegister((prevRegister) => !prevRegister);
    setName("");
    setEmail("");
    setPassword("");
  }

  function GoogleSign(e) {
    e.preventDefault();
    setLoginPressed(false);
    googleSignin(dispatchUser);
  }

  return (
    <main className={styles.login}>
      <Logo reduce={true} />
      <h1 className={styles.header}>
        {!register ? "LOG INTO YOUR ACCOUNT" : "CREATE A NEW ACCOUNT"}
      </h1>

      <form
        className={styles.form}
        onSubmit={register ? handleSignup : handleLogin}
      >
        {register && (
          <div className={styles.input__wrapper}>
            <input
              type="name"
              id="name"
              required
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={styles.input__field}
            />
            <label htmlFor="name" className={styles.input__label}>
              Name
            </label>
          </div>
        )}

        <div className={styles.input__wrapper}>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={styles.input__field}
          />
          <label htmlFor="email" className={styles.input__label}>
            Email
          </label>
          <img
            alt="email-Icon"
            title="email-Icon"
            src="email.svg"
            className={styles.i__icon}
          />
        </div>

        <div className={styles.input__wrapper}>
          <input
            id="password"
            type={attribute ? "text" : "password"}
            value={password}
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            required
            className={styles.input__field}
          />
          <label htmlFor="password" className={styles.input__label}>
            Password
          </label>
          <img
            onClick={iconClick}
            alt="Eye Icon"
            title="Eye Icon"
            src={attribute ? "eye-off.svg" : "eye.svg"}
            className={styles.input__icon}
          />
        </div>

        <div className={styles.divider}>or</div>

        <Button
          purpose="button"
          onClick={GoogleSign}
          type="google"
          disable={userIsLoading && !loginPressed}
        >
          {userIsLoading && !loginPressed ? (
            <span className={styles.google__verifying}></span>
          ) : (
            "Continue with Google"
          )}
        </Button>

        <div className={styles.footBtn}>
          <a onClick={toggleReg}>
            {register
              ? "Already have an account?"
              : "New here? Create an account!"}
          </a>
          <Button
            purpose="submit"
            type={userIsLoading && loginPressed ? "primary__blur" : "primary"}
            disable={userIsLoading && loginPressed}
          >
            {userIsLoading && loginPressed ? (
              <span className={styles.google__verifying}></span>
            ) : register ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}
