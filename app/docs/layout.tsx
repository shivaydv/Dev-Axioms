import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { SidebarTree, source } from "@/lib/source";
import { RootToggle } from "fumadocs-ui/layouts/docs.client";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import Logo from "@/components/ui/LogoComponent";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      nav={{
        title: (
          <>
            <Logo />
            <span className="text-sm font-medium">Dev Axioms</span>
          </>
        ),
        url: "/",
      }}
      links={[
        {
          type: "main",
          url: "/",

          text: "Home",
        },
        {
          type: "main",
          url: "/play",

          text: "Playground",
        },
        {
          type: "icon",
          icon: <FaXTwitter className="h-5 w-5" />,
          url: "https://x.com/shivay1256",
          text: "Twitter",
        },
        {
          type: "icon",
          icon: <FaGithub className="h-5 w-5" />,
          url: "https://github.com/shivaydv/dev-axioms",
          text: "GitHub",
        },
      ]}
      sidebar={{
        banner: (
          <>
            <RootToggle
              className="w-full flex justify-end  p-2"
              options={[
                {
                  title: "HTML",
                  icon: <div className="bg-fd-primary/20 rounded-md p-1 flex justify-center items-center"><FaHtml5 className="text-fd-primary w-5 h-5" /></div>,
                  description: "Foundation of websites",
                  url: "/docs/html",
                },
                {
                  title: "CSS",
                  icon: <div className="bg-fd-primary/20 rounded-md p-1 flex justify-center items-center"><FaCss3Alt className="text-fd-primary w-5 h-5"  /></div>,
                  description: "Create beautiful UI",
                  url: "/docs/css",
                },
                {
                  title: "JavaScript",
                  icon: <div className="bg-fd-primary/20 rounded-md p-1 flex justify-center items-center"><SiJavascript className="text-fd-primary w-5 h-5"  /></div>,
                  description: "Add interactivity and logic",
                  url: "/docs/javascript",
                },
                {
                  title: "React",
                  icon: <div className="bg-fd-primary/20 rounded-md p-1 flex justify-center items-center"><FaReact className="text-fd-primary w-5 h-5"  /></div>,
                  description: "Modern web applications",
                  url: "/docs/react",
                },
              ]}
            />
          </>
        ),
        
        hideSearch: false,
        collapsible: true,
      }}
      tree={SidebarTree}
    >
      
      {children}
    </DocsLayout>
  );
}
