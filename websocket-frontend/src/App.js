import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./Pages/Header/Header";
import "./assets/css/app.css";
import "./assets/css/bundle.css";

function App() {
  let Navigate = useNavigate();
  const token = localStorage.getItem("userDetails");
  useEffect(() => {
    let token = localStorage.getItem("userDetails");
    if (!token) {
      localStorage.clear();
      Navigate("/login");
    }
  }, []);
  return (
    <div>
      {token && (
        <div className="tyn-body">
          <div className="tyn-root" style={{ '--appbar-height': '73px' }}>
            <Header />
            <Dashboard />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
