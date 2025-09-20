export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className=" text-green-400">Layout</span>
      {children}
    </div>
  );
}
