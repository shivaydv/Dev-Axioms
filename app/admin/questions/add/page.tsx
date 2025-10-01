import AddQuestionForm from "@/components/admin-dashboard/add-question-form";
import { checkIsAdmin } from "@/lib/admin";
import { getUserSession } from "@/server/functions/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getUserSession();
  const isAdmin = checkIsAdmin(session);
  if (!isAdmin) redirect("/");
  return <AddQuestionForm />;
};

export default page;
