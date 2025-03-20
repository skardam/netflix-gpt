import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import authService from "../utils/authService";

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
        console.log("Skipping auth state change - authentication in progress");
        return;
      }

      if (user) {
        console.log("Auth state changed - user detected:", user.uid);

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
        console.log("Auth state changed - no user detected");
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
      <img
        className="w-36"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      {user && (
        <div className="p-2 flex">
          <img
            className="w-8 h-8 rounded-full"
            alt="user-logo"
            src={
              user?.photoURL || "https://example.com/jane-q-user/profile.jpg"
            }
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
