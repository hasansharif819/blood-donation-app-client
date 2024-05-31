"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.services";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthCheck;
