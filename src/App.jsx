import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block text-black">
            <Header />
            <main>{/* <Outlet /> */}</main>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
