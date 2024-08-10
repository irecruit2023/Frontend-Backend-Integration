import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Landing from "./pages/landing";
import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import SignUpMessage from "./pages/signUpMessage";
import Main from "./pages/main";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signUpMessage" element={<SignUpMessage/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/Main" element={<Main/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
