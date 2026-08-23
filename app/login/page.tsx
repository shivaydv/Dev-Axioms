"use client";
import { LogoIcon } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Loader, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { FaGithub } from "react-icons/fa6";
import { toast } from "sonner";

const GoogleIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const LoginForm = () => {
  const [loading, setLoading] = useState({
    state: false,
    provider: "" as "google" | "github" | "",
  });
  const params = useSearchParams();
  const from = params.get("from") || "/";

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading({ state: true, provider });
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const callbackUrl = `${origin}${decodeURIComponent(from)}`;

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
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden select-none">
      {/* Background Accent Glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5A26]/5 rounded-full blur-3xl pointer-events-none" /> */}

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-card/60"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border/60 bg-card/60 p-8 shadow-xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-2.5 rounded-xl bg-muted/50 border border-border/40 shadow-xs">
            <LogoIcon className="h-8 w-8 text-[#FF5A26]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Welcome to Dev Axioms</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sign in to track your progress, bookmark documentation, and solve practice questions.
            </p>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2.5 text-xs font-semibold h-10 border-border/60 bg-background/50 hover:bg-card hover:border-[#FF5A26]/40 hover:text-foreground transition-all shadow-xs"
            onClick={() => handleSignIn("google")}
            disabled={loading.state}
          >
            {loading.provider === "google" ? (
              <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <GoogleIcon />
            )}
            <span>Continue with Google</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2.5 text-xs font-semibold h-10 border-border/60 bg-background/50 hover:bg-card hover:border-[#FF5A26]/40 hover:text-foreground transition-all shadow-xs"
            onClick={() => handleSignIn("github")}
            disabled={loading.state}
          >
            {loading.provider === "github" ? (
              <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <FaGithub className="h-4 w-4 text-foreground" />
            )}
            <span>Continue with GitHub</span>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-center text-[11px] text-muted-foreground/70 leading-relaxed border-t border-border/40">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5A26]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default page;
