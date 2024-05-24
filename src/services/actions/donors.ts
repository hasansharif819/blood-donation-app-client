"use server";

export const donors = async () => {
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/donor-list`,
    `https://blood-donation-server-final-six.vercel.app/api/donor-list`,
    {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    }
  );

  const donorLists = await res.json();
  return donorLists;
};
