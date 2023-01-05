import styles from "./styles.module.css";
// import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import LoginForm from "./loginForm";
import Home from "./homeMenu";
import { useState } from "react";

export default function ChatWindow() {
  const [page, setPage] = useState("home");

  const callbacks = {
    goToSignup: () => setPage("sign-up"),
    goToHome: () => setPage("home"),
    goToLogin: () => setPage("login"),
  };

  return (
    <div className={styles.chatContainer}>
      {page === "home" && <Home cb={callbacks}/>}
      {page === "sign-up" && <SignupForm cb={callbacks}/>}
      {page === "login" && <LoginForm cb={callbacks}/>}
    </div>
  );
}




