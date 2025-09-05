"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const SignoutBtn = ({ className }: { className?: string }) => {
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
            console.log("Signed out successfully");
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
      variant={"destructive"}
      size={"sm"}
      className={className}
    >
      {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      Logout
    </Button>
  );
};

export default SignoutBtn;
