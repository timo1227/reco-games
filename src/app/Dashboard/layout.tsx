interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata = {
  title: "Dashboard",
  description: "Get Game Recommendations ",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="h-full pt-24 px-5">{children}</div>;
}
