"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null
}

export default NotFound;