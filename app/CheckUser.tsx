import LoginDialog from "@/components/LoginDialog/LoginDialog";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";

export default function UserChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data: session} = useSession();

  return session?.user ? (
    <React.Fragment>
      <Navbar />
      <div style={{marginLeft: "100px", width: "100%"}}>
        {children}
      </div>
    </React.Fragment>
  ) : (
    <LoginDialog />
  );
}