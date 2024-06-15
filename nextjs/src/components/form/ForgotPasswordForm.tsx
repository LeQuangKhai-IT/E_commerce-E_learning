"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { forgotPassword } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let tempErrors: { [key: string]: string } = {};
    if (validate()) {
      const result = await dispatch(forgotPassword(email));
      if (result) {
        if (result.payload.status === 404) {
          tempErrors.email = result.payload.message ?? " ";
          setErrors(tempErrors);
        } else {
          toast.success(result.payload.msg, {
            duration: 2000,
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
          router.push("reset-password");
        }
        return Object.keys(tempErrors).length === 0;
      }
    }
  };
  return (
    <form>
      <div className="flex-col space-y-5">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`mt-1 block w-full px-3 py-2 border 
        ${errors.email ? "border-red-500" : "border-gray-300"}
         rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {status && status === "loading" ? `Submit...` : "Submit"}
        </button>
      </div>
    </form>
  );
};
export default ForgotPasswordForm;
