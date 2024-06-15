"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { resetPassword } from "@/redux/auth/authSlice";

interface Errors {
  code?: string;
  password?: string;
}

const ResetPasswordForm = () => {
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validate = (): boolean => {
    let tempErrors: Errors = {};
    if (!code) {
      tempErrors.code = "Code is required.";
    } else if (!/[a-z0-9/]/g.test(code)) {
      tempErrors.code = "Code is invalid.";
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

  const handleSubmit = async () => {
    let tempErrors: { [key: string]: string } = {};
    if (validate()) {
      try {
        const result = await dispatch(resetPassword({ code, password }));
        if (result.payload.status === 500) {
          tempErrors.code = result.payload.message ?? " ";
          setErrors(tempErrors);
        } else {
          toast.success(result.payload.msg, {
            duration: 2000,
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
          router.push("sign-in");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form>
      <div className="mb-2">
        <div className="bg-green-200 p-2 rounded-lg">
          Please check code we are submited for your email and part on input
          Code to update new password !
        </div>
        <label className="block text-gray-700">Code</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={code}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          required
        />
        {errors.code ? (
          <span className="text-red-500 text-sm">{errors.code}</span>
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

      <button
        onClick={handleSubmit}
        type="button"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {status && status === "loading" ? `Submit...` : "Submit"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
