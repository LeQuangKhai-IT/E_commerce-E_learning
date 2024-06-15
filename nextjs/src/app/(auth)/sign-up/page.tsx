import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/form/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <RegisterForm />
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link className="text-blue-500 hover:underline" href={"sign-in"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
