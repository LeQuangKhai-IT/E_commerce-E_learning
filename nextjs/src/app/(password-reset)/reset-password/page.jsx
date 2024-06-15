import ResetPasswordForm from "@/components/form/ResetPasswordForm";
export default function ResetPasswordPage() {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
