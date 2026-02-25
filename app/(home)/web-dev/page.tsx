import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaHtml5, FaJs, FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { MoveRight } from "lucide-react";

export default function WebDevPage() {
    const categories = [
        {
            title: "HTML & CSS",
            description: "Master the building blocks of the web with modern layouts and styling techniques.",
            href: "/web-dev/html-css",
            icon: <FaHtml5 className="w-6 h-6 text-orange-500" />,
            largeIcon: <FaHtml5 className="w-12 h-12 text-orange-500" />,
            tag: "Fundamentals"
        },
        {
            title: "JavaScript",
            description: "Deep dive into core JavaScript concepts, from DOM manipulation to asynchronous programming.",
            href: "/web-dev/javascript",
            icon: <FaJs className="w-6 h-6 text-yellow-400" />,
            largeIcon: <FaJs className="w-12 h-12 text-yellow-400" />,
            tag: "Core"
        },
        {
            title: "React",
            description: "Build dynamic and interactive user interfaces with the most popular UI library.",
            href: "/web-dev/react",
            icon: <FaReact className="w-6 h-6 text-blue-400" />,
            largeIcon: <FaReact className="w-12 h-12 text-blue-400" />,
            tag: "Frontend"
        },
        {
            title: "Next.js",
            description: "Learn the power of server-side rendering and static site generation with Next.js.",
            href: "/web-dev/nextjs",
            icon: <SiNextdotjs className="w-6 h-6 text-foreground" />,
            largeIcon: <SiNextdotjs className="w-12 h-12 text-foreground" />,
            tag: "Framework"
        }
    ];

    return (
        <div className="container py-24 max-w-4xl mx-auto px-6">
            <div className="space-y-4 mb-20 px-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground/90">Web Development</h1>
                <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                    The essential guide to modern web construction. Comprehensive paths from foundational blocks to advanced architectural frameworks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {categories.map((category) => (
                    <Link key={category.href} href={category.href} className="group">
                        <Card className="h-full transition-all duration-500 ease-in-out hover:ring-2 hover:ring-primary/20 border-border/40 bg-card/30 backdrop-blur-md overflow-hidden relative shadow-sm hover:shadow-xl hover:-translate-y-1">
                            {/* Background Accent Icon */}
                            <div className="absolute -top-3 -right-3 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 ease-in-out transform group-hover:scale-125 group-hover:-rotate-12">
                                {category.largeIcon}
                            </div>

                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 text-left p-6">
                                <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/10 transition-colors duration-500 group-hover:bg-primary/10">
                                    {category.icon}
                                </div>
                                <div>
                                    <div className="text-[10px] font-semibold text-primary/70 mb-0.5 uppercase tracking-[0.15em]">{category.tag}</div>
                                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-500 tracking-tight">{category.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6 pt-0">
                                <CardDescription className="text-sm leading-relaxed text-muted-foreground/80 text-left px-0">
                                    {category.description}
                                </CardDescription>
                                <div className="flex items-center text-xs font-bold text-primary/70 group-hover:text-primary transition-all duration-500 group-hover:pl-1">
                                    Start Learning <MoveRight className="w-3.5 h-3.5 ml-2 opacity-50 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
