"use client";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../services/auth.services";
import DashboardDrawer from "../../components/Dashboard/DashboardDrawer/DashboardDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
