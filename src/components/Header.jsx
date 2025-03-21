import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import authService from "../utils/authService";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    authService.signOut(dispatch).then((result) => {
      if (result.success) {
        // Navigation will be handled by onAuthStateChanged
      } else {
        navigate("/error");
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Skip auth state changes while we're in the process of authenticating
      if (authService.isAuthenticating()) {
        return;
      }

      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "User",
            photoURL:
              user.photoURL || "https://example.com/jane-q-user/profile.jpg",
          })
        );

        // Only navigate if we're not already on the browse page
        if (window.location.pathname !== "/browse") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());

        // Only navigate if we're not already on the login page
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36" src={NETFLIX_LOGO} alt="Netflix Logo" />
      {user && (
        <div className="p-2 flex">
          <img
            className="w-8 h-8 rounded-full"
            alt="user-logo"
            src={USER_AVATAR}
          />
          <button className="text-white font-bold p-2" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
