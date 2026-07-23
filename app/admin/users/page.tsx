import React, { Suspense } from "react";
import { UsersList } from "@/components/admin-dashboard/users-list";
import { getAllUsersWithActivity } from "@/server/functions/admin-stats";
import { LoadingTable } from "@/components/admin-dashboard/loading-table";

export const metadata = {
  title: "User Directory & Activity | Dev Axioms Admin",
  description: "View platform registered users and their liked and bookmarked practice questions.",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">User Activity & Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor registered members, community likes, and saved question activity.
          </p>
        </div>
      </div>

      {/* Users Table Streamed */}
      <Suspense fallback={<LoadingTable />}>
        <UsersTableWrapper />
      </Suspense>
    </div>
  );
}

async function UsersTableWrapper() {
  const users = await getAllUsersWithActivity();
  return <UsersList users={users} />;
}
