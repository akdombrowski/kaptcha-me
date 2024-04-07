"use server";

import { redirect } from "next/navigation";

export default async function loginFormSubmit(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("email:", email);
  console.log("password:", password);

  redirect("/kaptchame");
}
