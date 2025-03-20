import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/Validate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../utils/authService";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const message = validateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    try {
      if (!isSignIn) {
        // Sign Up flow
        const result = await authService.signUp(
          name.current.value,
          email.current.value,
          password.current.value,
          dispatch
        );

        if (result.success) {
          navigate("/browse");
        } else {
          setErrorMessage(result.error.code + ": " + result.error.message);
        }
      } else {
        // Sign In flow
        const result = await authService.signIn(
          email.current.value,
          password.current.value,
          dispatch
        );

        if (result.success) {
          navigate("/browse");
        } else {
          setErrorMessage(result.error.code + ": " + result.error.message);
        }
      }
    } catch (error) {
      setErrorMessage("Authentication error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(null);
  };

  return (
    <div className="relative h-screen">
      <Header />

      {/* Background Image - Make it fill the screen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/IN-en-20250224-TRIFECTA-perspective_3a9c67b5-1d1d-49be-8499-d179f6389935_large.jpg')",
        }}
      >
        {/* Overlay to improve form visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Login Form - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-12 mx-auto rounded-lg bg-black/75 text-white z-10"
        >
          <h1 className="font-bold text-3xl text-white mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="rounded-md w-full bg-gray-700 mb-4 p-4"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email or phone number"
            className="rounded-md w-full bg-gray-700 mb-4 p-4"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="rounded-md w-full bg-gray-700 mb-4 p-4"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-4 mt-2 bg-red-600 w-full rounded-md font-medium"
          >
            {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          <div className="flex justify-between mt-4 text-gray-400 text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-1" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <div className="mt-16 text-gray-400">
            <p>
              {isSignIn ? "New to Netflix?" : "Already have an account?"}{" "}
              <a
                href="#"
                className="text-white hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSignIn();
                }}
              >
                {isSignIn ? "Sign up now." : "Sign in."}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
