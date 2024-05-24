"use server";

export const registerUser = async (data: any) => {
  console.log("Data from register user ", data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`,
    {
      method: "POST",
      // body: formData,
      // cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    }
  );

  const registerUserInfo = await res.json();
  return registerUserInfo;
};
