"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoPersonSharp } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/Dashboard/Games/" },
  { name: "Features", href: "#Features" },
  { name: "About", href: "#About" },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7 mr-3 text-white "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7 mr-3 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  function SessionLink() {
    if (session) {
      if (mobileMenuOpen) {
        return (
          <>
            {/* <Link
              href="/Profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </Link> */}
            <Link
              href="/Login"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              onClick={() => signOut()}
            >
              Log out
            </Link>
          </>
        );
      }
      return (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="flex items-center text-sm font-medium text-black dark:text-white hover:text-gray-700 hover:underline focus:outline-none"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <IoPersonSharp className="h-6 w-6" aria-hidden="true" />
            </button>
            <div
              className={`${
                profileMenuOpen ? "block" : "hidden"
              } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* <Link
                href="/Profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 "
                role="menuitem"
              >
                Your Profile
              </Link> */}
              <Link
                href="/Login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                role="menuitem"
                onClick={() => signOut()}
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      if (mobileMenuOpen) {
        return (
          <Link
            href="/Login"
            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50"
            onClick={() => signIn()}
          >
            Log in
          </Link>
        );
      }
      return (
        <Link
          href="/"
          className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          onClick={() => signIn()}
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      );
    }
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-14 w-auto"
              width={300}
              height={500}
              src="/logo.jpg"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className={`h-6 w-6 dark:text-white ${
                mobileMenuOpen ? "hidden" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              href={
                item.name === "Games"
                  ? `${item.href}/${session?.user.games}`
                  : `${item.href}`
              }
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {renderThemeChanger()}
          <SessionLink />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 bg-white dark:bg-[#181818] sm:ring-gray-900/10 dark:sm:ring-gray-400/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="">
              <span className="sr-only">Logo</span>
              <Image
                className="h-14 w-auto"
                src="/logo.jpg"
                width={300}
                height={500}
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-50/10">
              <div className="space-y-2 py-6">
                {NAVIGATION.map((item) => (
                  <Link
                    key={item.name}
                    href={
                      item.name === "Games"
                        ? `${item.href}/${session?.user.games}`
                        : `${item.href}`
                    }
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
                {renderThemeChanger()}
              </div>
              <div className="py-6">
                <SessionLink />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
