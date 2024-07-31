import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
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
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/10" element={<Root />} /> */}
      <Route path="/login" element={<Login/>} />
      {/* <Route path="/10e" element={<E />} /> */}
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/signUpMessage" element={<SignUpMessage/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/Main" element={<Main/>} />
    </Routes>
  );
}
export default App;