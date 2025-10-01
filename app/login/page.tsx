"use client";
import { LogoIcon } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";

const LoginForm = () => {
  const [loading, setLoading] = useState({
    state: false,
    provider: "" as "google" | "github" | "",
  });
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/";
  // const safeFrom = from.startsWith("/") ? from : "/";

  const callbackUrl = `${window.location.origin}${decodeURIComponent(from)}`;

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading({ state: true, provider });
    await signIn.social({
      provider,
      callbackURL: callbackUrl,
      fetchOptions: {
        onError: () => {
          toast.error("Sign-in failed. Please try again.");
          setLoading({ state: false, provider: "" });
        },
      },
    });
  };

  return (
    <div className="flex h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LogoIcon className="h-12 w-12" />
        <h1 className="mb-2 text-2xl font-bold">Login to your account</h1>

        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => handleSignIn("google")}
          disabled={loading.state}
        >
          {loading.provider === "google" ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <FaGoogle className="h-5 w-5" />
          )}
          Login with Google
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => handleSignIn("github")}
          disabled={loading.state}
        >
          {loading.provider === "github" ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <FaGithub className="h-5 w-5" />
          )}
          Login with GitHub
        </Button>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-svh items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default page;
