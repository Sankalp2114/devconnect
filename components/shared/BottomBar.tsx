"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function BottomBar() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link rounded-full p-4 ${
                isActive && "bg-gradient-radial lg:bg-primary-500"
              }`}
            >
              {link.icon}
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
