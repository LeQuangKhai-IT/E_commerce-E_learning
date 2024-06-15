import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
export default function ForgotPasswordPage() {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
