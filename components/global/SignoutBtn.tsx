"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignoutBtnProps {
  className?: string;
}

const SignoutBtn = ({ className }: SignoutBtnProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onError() {
            toast.error("Sign-out failed. Try again later.");
          },
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="ghost"
      size="sm"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 transition-colors justify-start",
        className
      )}
    >
      {isPending ? (
        <Loader className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <LogOut className="h-3.5 w-3.5" />
      )}
      <span>Log out</span>
    </Button>
  );
};

export default SignoutBtn;
