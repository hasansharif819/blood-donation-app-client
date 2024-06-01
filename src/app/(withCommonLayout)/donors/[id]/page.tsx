// import DonorDetailsCard from "@/components/UI/Donor/DonorDetailsCard";

import DonorDetailsCard from "@/components/UI/Donor/DonorDetailsCard";

type PropTypes = {
  params: {
    id: string;
  };
};

const DonorsProfilePage = async ({ params }: PropTypes) => {
  const res = await fetch(
    `https://blood-donation-server-final-six.vercel.app/api/donor-list/${params.id}`
  );
  const { data: donor } = await res.json();

  return (
    <>
      <DonorDetailsCard donor={donor} />
    </>
  );
};

export default DonorsProfilePage;
