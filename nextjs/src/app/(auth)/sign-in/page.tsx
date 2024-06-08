"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { login } from "@/redux/auth/authSlice";
import Link from "next/link";

interface Errors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { status } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorMesage, setErrorMessage] = useState<string>(
    "The email address or password is incorrect!"
  );

  const validate = (): boolean => {
    let tempErrors: Errors = {};
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (!/^[a-zA-Z0-9]{6,32}$/.test(password)) {
      tempErrors.password = "More than 6 characters and no special characters!";
    } else {
      tempErrors.password = "";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const result = await dispatch(login({ email, password }));
        if (result.payload.status === 404) {
          setErrors({ email: errorMesage, password: errorMesage });
        } else if (result.payload.status === 401) {
          setErrors({ email: errorMesage, password: errorMesage });
        } else {
          toast.success(result.payload.msg, {
            duration: 4000,
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            {errors ? (
              <span className="text-red-500 text-sm">{errors.email}</span>
            ) : (
              <span className="text-red text-sm invisible">hide</span>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <IconContext.Provider value={{ color: "black", size: "1em" }}>
              <button
                type="button"
                className="absolute inset-y-1 right-0 pr-3 items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </IconContext.Provider>
            {errors.password ? (
              <span className="text-red-500 text-sm">{errors.password}</span>
            ) : (
              <span className="text-red text-sm invisible">hide</span>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {status && status === "loading" ? `${status}...` : "login"}
          </button>
        </form>
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

export default LoginForm;
