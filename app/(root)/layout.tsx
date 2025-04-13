import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/stark.png" alt="MockMate Logo" width={45} height={35} />
          <h2 className="text-primary-100">
            <span className="font-extrabold text-5xl text-purple-600">M</span>
            ockWise
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/about-us">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/docs">
            <Button variant="ghost">Documentation</Button>
          </Link>
          <form action="/api/logout" method="POST">
            <Button
              type="submit"
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </Button>
          </form>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
