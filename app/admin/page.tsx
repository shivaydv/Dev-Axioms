import { checkIsAdmin } from "@/lib/admin";
import { getUserSession } from "@/server/functions/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const session = await getUserSession();
  const isAdmin = checkIsAdmin(session);
  if (!isAdmin) redirect("/");

  return <div>Working on Dashboard</div>;
};

export default AdminPage;
