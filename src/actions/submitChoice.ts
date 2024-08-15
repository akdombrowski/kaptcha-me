"use server";

// export default async function submitChoice(choice: FormEvent<HTMLButtonElement>) {
export default async function submitChoice(formData: FormData) {
  console.log("");
  console.log("");
  console.log("");
  console.log("inside submit choice server action");

  const choiceName = formData.keys().next().value;
  const choiceValue = formData.values().next().value;
  console.log("choiceName:", choiceName);
  console.log("choiceValue:", choiceValue);

  console.log("formAction");
  console.log();
  console.log("");
  console.log("");
  console.log("");
  return "returning from submitChoice server action, yes";
}
