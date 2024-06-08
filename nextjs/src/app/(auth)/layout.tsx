export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="py-10 bg-gray-100">{children}</section>;
}
