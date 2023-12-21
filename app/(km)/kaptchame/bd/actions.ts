"use server";

export async function checkChall(formData: FormData) {
  "use server";

  const challenge = formData.get("challenge");
  console.log("");
  console.log("Challenge:");
  console.log(challenge);
  console.log("");


}

export async function createChalls(count: number) {
  
}
