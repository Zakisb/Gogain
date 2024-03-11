export default function Layout({
  admin,
  hr,
}: Readonly<{
  admin: React.ReactNode;
  hr: React.ReactNode;
}>) {
  return (
    <div className="">
      {admin}
      {hr}
    </div>
  );
}
