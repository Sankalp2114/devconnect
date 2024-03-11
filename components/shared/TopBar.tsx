import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

function TopBar() {
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden ">
          DevConnect
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden ">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
                <LogOut color="white" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;
