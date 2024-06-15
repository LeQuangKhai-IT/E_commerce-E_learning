"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { register } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!firstName) tempErrors.firstName = "First name is required.";
    if (!lastName) tempErrors.lastName = "Last name is required.";
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    if (password !== rePassword) {
      tempErrors.rePassword = "Passwords do not match.";
    }
    if (!acceptedTerms) {
      tempErrors.acceptedTerms = "You must accept the terms and conditions.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    let tempErrors: { [key: string]: string } = {};
    if (validate()) {
      const result = await dispatch(
        register({ email, password, fname: firstName, lname: lastName })
      );
      if (result) {
        if (result.payload.status === 409) {
          tempErrors.email = result.payload.message ?? " ";
          setErrors(tempErrors);
        } else {
          toast.success(result.payload.msg, {
            duration: 2000,
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
          router.push("sign-in");
        }
        return Object.keys(tempErrors).length === 0;
      }
    }
  };
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">{errors.firstName}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">{errors.lastName}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="mb-4">
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="rePassword" className="block text-gray-700">
          Confirm Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="rePassword"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.rePassword ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
        {errors.rePassword && (
          <span className="text-red-500 text-sm">{errors.rePassword}</span>
        )}
      </div>
      <label className="inline-flex items-center mb-3">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(!showPassword)}
        />
        <span className="ml-2">Show password</span>
      </label>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span className="ml-2">
            I accept{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              terms and conditions
            </a>
          </span>
        </label>
        {errors.acceptedTerms && (
          <span className="text-red-500 text-sm block">
            {errors.acceptedTerms}
          </span>
        )}
      </div>
      <button
        onClick={handleSignUp}
        type="button"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {status && status === "loading" ? `${status}...` : "Sign Up"}
      </button>
    </form>
  );
};
export default RegisterForm;
