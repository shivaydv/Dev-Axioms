import React from "react";

const footerLinks = {
  Products: [
    { label: "Dev Axioms", href: "#" },
    { label: "Practice Pro", href: "#" },
    { label: "Interview Kit", href: "#" },
  ],
  Components: [
    { label: "Roadmap", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Introduction", href: "#" },
    { label: "Installation", href: "#" },
  ],
  Resources: [
    { label: "Web Dev", href: "#" },
    { label: "Web3", href: "#" },
    { label: "Practice", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "License", href: "#" },
  ],
  Learning: [
    { label: "HTML & CSS", href: "#" },
    { label: "JavaScript", href: "#" },
    { label: "React", href: "#" },
    { label: "Updates", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "Contact us", href: "#" },
    { label: "About", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative mt-0">
      <div className="relative px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 py-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4 md:text-center">
              <h3 className="text-foreground text-sm font-medium">{section}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label} className="w-full">
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-foreground inline-block w-full text-sm transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Large Dev Axioms Text */}
      <h2
        className="text-foreground justify-center overflow-hidden px-2 text-center text-7xl font-bold text-nowrap md:text-8xl md:tracking-wider lg:text-9xl xl:text-[12rem]"
        style={{
          maskImage: "linear-gradient(to top, transparent 0%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 100%)",
        }}
      >
        Dev Axioms
      </h2>
    </footer>
  );
};

export default Footer;
