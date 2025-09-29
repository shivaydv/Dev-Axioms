import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [nextCookies(), inferAdditionalFields<typeof auth>()],
});

export const { signIn, signOut, useSession } = authClient;
export type Session = typeof authClient.$Infer.Session;
