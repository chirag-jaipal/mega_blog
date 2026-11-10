import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logoutUser()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn;
