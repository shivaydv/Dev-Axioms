import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import Logo from "@/components/ui/LogoComponent";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <HomeLayout
      nav={{
        title: (
          <>
            <Logo />
            <span className="text-sm font-medium">Dev Axioms</span>
          </>
        ),
      }}
      links={[
        {
          type: "main",
          url: "/docs",
          text: "Docs",
        },
        {
          type: "main",
          url: "/play",
          text: "Playground",
        },
        {
          type: "icon",
          icon: <FaXTwitter />,
          url: "https://x.com/shivay1256",
          text: "Twitter",
        },
        {
          type: "icon",
          icon: <FaGithub />,
          url: "https://github.com/shivaydv/dev-axioms",
          text: "GitHub",
        },
      ]}
    >

      <div className="flex-1 container ">{children}</div>
      <Footer />
    </HomeLayout>
  );
}

function Footer(): React.ReactElement {
  return (
    <footer className="mt-auto border-t bg-fd-card py-4 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold">Dev Axioms</p>
          <p className="text-xs">
            Built with ❤️ by{" "}
            <a
              href="https://x.com/shivay1256"
              rel="noreferrer noopener"
              target="_blank"
              className="font-medium"
            >
              Shiva
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
