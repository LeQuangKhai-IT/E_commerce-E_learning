export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="md:py-10 py-0 bg-gray-100">{children}</section>;
}
