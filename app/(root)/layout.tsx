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
      <nav className="flex ">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/stark.png" alt="MockMate Logo" width={45} height={35} />
          <h2 className="text-primary-100"><span className="font-extrabold text-5xl text-purple-600">M</span>ockWise<hr className="text-purple-800"></hr></h2>
        </Link>
        <Link href="/about-us">
        <Button variant="link">About Us</Button>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;