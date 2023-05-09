"use client";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserAuthForm() {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const redirectToHome = () => {
    push("/");
  };

  const loginUser = async () => {
    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `/Dashboard`,
      });
      if (res.error) {
        setLoading(false);
        setError(res.error);
      } else {
        redirectToHome();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  const registerUser = async () => {
    try {
      const res: Response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.status !== 200) {
        const { errorMSG } = await res.json();
        setLoading(false);
        setError(errorMSG);
      } else {
        loginUser();
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleCreateAccount = () => {
    setRegister(!register);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (register) {
      registerUser();
    } else {
      loginUser();
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  }, [error]);

  return (
    <>
      <div className="flex h-[calc(100vh-11rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {!register ? (
            <div>
              <Link href="/">
                <Image
                  className="mx-auto h-44 w-auto"
                  width={300}
                  height={500}
                  src="/logo.jpg"
                  alt="Logo"
                />
              </Link>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
                Or{" "}
                <button
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  onClick={handleCreateAccount}
                >
                  Create your Account today
                </button>
              </p>
            </div>
          ) : (
            <div>
              <Image
                className="mx-auto h-44 w-auto"
                width={300}
                height={500}
                src="/logo.jpg"
                alt="Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white px-5">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <button
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  onClick={handleCreateAccount}
                >
                  Sign into your Account
                </button>
              </p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setError("")}
                >
                  <title>Close</title>
                  <path
                    fillRule="evenodd"
                    d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {register && (
                <div>
                  <label htmlFor="username" className="sr-only">
                    User Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="text"
                    value={username}
                    required
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="User Name"
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className={
                    register
                      ? "relative block w-full border-0 py-1.5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                      : "relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  }
                  placeholder="Email address"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {!register && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={handleSubmit}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  `${register ? "Create Account" : "Sign In"}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
