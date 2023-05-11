interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="h-full pt-24 px-5">{children}</div>;
}
