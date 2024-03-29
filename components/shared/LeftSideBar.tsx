"use client";

import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { FileCode2, LogOut } from "lucide-react";

function LeftSideBar() {
  const router = useRouter();
  const pathName = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link rounded-full p-4 ${
                isActive && "bg-gradient-radial lg:bg-primary-500"
              }`}
            >
              {link.icon}
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        <Link
          href="https://codesnap-lac.vercel.app"
          target="_blank"
          className={`leftsidebar_link rounded-full p-4`}
        >
          <FileCode2 color="white" />
          <p className="text-light-1 max-lg:hidden">CodeSnap</p>
        </Link>
      </div>
      <div className="mt-10 ps-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <LogOut color="white" />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSideBar;
