import Donors from "@/app/(withCommonLayout)/donors/page";

const DashboardHomePage = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "48px" }}>Donors</h3>
      <Donors />
    </div>
  );
};

export default DashboardHomePage;
