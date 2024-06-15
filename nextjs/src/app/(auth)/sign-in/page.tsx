"use client";
import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import Link from "next/link";
import LoginForm from "@/components/form/LoginForm";

const LoginPage: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm />
        <div className="mt-4 text-center">
          <span className="text-gray-600">or sign in with</span>
          <div className="flex justify-center mt-3">
            <button
              className="bg-white-600 py-2 px-4 rounded-md hover:bg-gray-200 mx-1 focus:outline-none"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <IconContext.Provider value={{ color: "blue", size: "2.5em" }}>
                <FaFacebook />
              </IconContext.Provider>
            </button>
            <button
              className="bg-white-600 py-2 px-4 rounded-md hover:bg-gray-200 mx-1 focus:outline-none"
              onClick={() => handleSocialLogin("Google")}
            >
              <IconContext.Provider value={{ color: "blue", size: "2.5em" }}>
                <FcGoogle />
              </IconContext.Provider>
            </button>
            <button
              className="bg-white-600 py-2 px-4 rounded-md hover:bg-gray-200 mx-1 focus:outline-none"
              onClick={() => handleSocialLogin("GitHub")}
            >
              <IconContext.Provider value={{ color: "black", size: "2.5em" }}>
                <FaGithub />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link className="text-blue-500 hover:underline" href={"sign-up"}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
