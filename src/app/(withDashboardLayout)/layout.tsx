import AuthCheck from "../(withCommonLayout)/components/AuthCheck";
import DashboardDrawer from "../../components/Dashboard/DashboardDrawer/DashboardDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCheck>
      <DashboardDrawer>{children}</DashboardDrawer>
    </AuthCheck>
  );
};

export default DashboardLayout;
