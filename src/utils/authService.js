import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { addUser, removeUser } from "./userSlice";

// This variable prevents the auth state from firing immediately after login/signup
let isAuthenticating = false;

const authService = {
  // Set flag when starting authentication
  setAuthenticating: (value) => {
    isAuthenticating = value;
  },

  // Check if we're in the process of authenticating
  isAuthenticating: () => {
    return isAuthenticating;
  },

  // Sign up new user
  signUp: async (name, email, password, dispatch) => {
    try {
      isAuthenticating = true;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || name,
          photoURL:
            user.photoURL || "https://example.com/jane-q-user/profile.jpg",
        })
      );

      // Keep flag true for a bit longer to prevent onAuthStateChanged confusion
      setTimeout(() => {
        isAuthenticating = false;
      }, 1000);

      return { success: true, user };
    } catch (error) {
      isAuthenticating = false;
      return { success: false, error };
    }
  },

  // Sign in existing user
  signIn: async (email, password, dispatch) => {
    try {
      isAuthenticating = true;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
          photoURL:
            user.photoURL || "https://example.com/jane-q-user/profile.jpg",
        })
      );

      // Keep flag true for a bit longer to prevent onAuthStateChanged confusion
      setTimeout(() => {
        isAuthenticating = false;
      }, 1000);

      return { success: true, user };
    } catch (error) {
      isAuthenticating = false;
      return { success: false, error };
    }
  },

  // Sign out user
  signOut: async (dispatch) => {
    try {
      await firebaseSignOut(auth);
      dispatch(removeUser());
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },
};

export default authService;
