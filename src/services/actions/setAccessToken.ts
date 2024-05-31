"use server";

import { cookies } from "next/headers";

import { authKey } from "@/contants/authkey";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  // console.log("Set Access Token ====", token);
  cookies().set(authKey, token);
  cookies().set("accessToken", token);
  if (option && option.passwordChangeRequired) {
    redirect("/dashboard/change-password");
  }
  if (option && !option.passwordChangeRequired && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
