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
    ]
};

const Footer = () => {
    return (
        <footer className="relative mt-0">
            <div className="relative px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 py-6">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="space-y-4 md:text-center">
                            <h3 className="text-sm font-medium text-foreground">{section}</h3>
                            <ul className="space-y-3 ">
                                {links.map(({ label, href }) => (
                                    <li key={label} className="w-full ">
                                        <a
                                            href={href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full inline-block "
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
                className="text-7xl justify-center md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-foreground text-center md:tracking-wider px-2 overflow-hidden text-nowrap"
                style={{
                    maskImage: "linear-gradient(to top, transparent 0%, black 100%)",
                    WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 100%)",
                }}
            >
                Dev Axioms
            </h2>
        </footer>
    );
};

export default Footer;
