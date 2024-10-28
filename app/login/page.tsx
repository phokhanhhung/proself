"use client";
import LoginDialog from "@/components/LoginDialog/LoginDialog";
import "./Login.scss";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const {data: session} = useSession();
  useEffect(() => {
    console.log("dialog", session)
  }, [])
  return (
    <div className="login-page">
      <LoginDialog />
    </div>
  );
}

export default LoginPage;