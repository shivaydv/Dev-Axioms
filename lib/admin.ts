import { Session } from "./auth";

export const checkIsAdmin = (session: Session | null) => {
  if (session?.user && session.user.role === "ADMIN") {
    return true;
  }
  return false;
};
