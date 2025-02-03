"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "blog",
    path: "https://medium.com/@mohamedelshawaf",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        {/* Logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/" onClick={handleLinkClick}>
            <h1 className="text-4xl font-semibold">
              TheShawaf<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathName &&
                  "text-accent border-b-2 border-accent"
                } text-xl capitalize hover:text-accent transition-all`}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <SheetClose asChild>
          <button className="absolute right-8 top-8 transition-opacity outline-none">
            <IoMdClose className="text-3xl text-accent" />
            <span className="sr-only">Close</span>
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
