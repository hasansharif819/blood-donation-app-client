import DonorDetailsCard from "@/components/UI/Donor/DonorDetailsCard";

type PropTypes = {
  params: {
    id: string;
  };
};

const DonorsProfilePage = async ({ params }: PropTypes) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${params.id}`
  );
  const { data: donor } = await res.json();

  return (
    <>
      <DonorDetailsCard donor={donor} />
    </>
  );
};

export default DonorsProfilePage;
