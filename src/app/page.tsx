"use server";

// should this be server?
import "server-only";

import { SignInPage } from "#/src/ui/sign-in";

export default async function Page() {
  return <SignInPage />;
}
