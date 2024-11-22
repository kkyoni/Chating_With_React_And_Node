import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Pages/Header/Header";
import "./assets/css/app.css";
import "./assets/css/bundle.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let Navigate = useNavigate();
  const token = localStorage.getItem("userDetails");

  useEffect(() => {
    if (!token) {
      localStorage.clear();
      Navigate("/login");
    }
  }, [Navigate, token]);

  return (
    <div>
      {token && (
        <div className="tyn-body">
          <div className="tyn-root" style={{ "--appbar-height": "73px" }}>
            <ToastContainer />
            <Header />
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
