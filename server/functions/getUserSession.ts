import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { cache } from "react";

export const getUserSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});
