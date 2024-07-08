"use server";

import { FormEvent, FormEventHandler, SyntheticEvent } from "react";

// export default async function submitChoice(choice: FormEvent<HTMLButtonElement>) {
export default async function submitChoice(id: string, event: SyntheticEvent) {
  console.log("");
  console.log("");
  console.log("");
  console.log("inside submit choice server action");
  console.log("formData:", event);
  console.log("");
  console.log("");
  console.log("");
  return "returning from submitChoice server action, yes";
}
