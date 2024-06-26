"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { toast } from "sonner";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login } from "@/redux/auth/authSlice";

interface Errors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { status } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorMesage, setErrorMessage] = useState<string>(
    "Email or password is incorrect!"
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

  const handleRemember = (): any => {
    if (rememberMe) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      setRememberMe(!rememberMe);
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setRememberMe(!rememberMe);
    }
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
            duration: 2000,
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

  return (
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
            onChange={() => handleRemember()}
            className="mr-2"
          />
          Remember Me
        </label>
        <Link href="forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <button
        onClick={handleLogin}
        type="button"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {status && status === "loading" ? `login...` : "login"}
      </button>
    </form>
  );
};

export default LoginForm;
