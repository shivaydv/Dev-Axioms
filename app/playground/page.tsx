import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa6";
import { SiJavascript } from "react-icons/si";

export const metadata = {
  title: "Playgrounds | Dev Axioms",
  description: "Interactive coding playgrounds for JavaScript, Web, and React development.",
};

export default function PlaygroundIndexPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-background overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="container mx-auto py-16 md:py-24 flex flex-col gap-12 max-w-6xl px-4 md:px-6 relative z-10">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.08]">
            Interactive Playgrounds
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select an environment to start experimenting. Test logic in isolation or build interactive UI with a live preview.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Card 1: Node.js */}
          <Link href="/playground/javascript" className="group outline-none block h-full">
            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-card hover:border-[#F7DF1E]/50 hover:shadow-[0_8px_30px_rgb(247,223,30,0.08)]">
              <div className="p-8 flex flex-col flex-1">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 border border-border/60 group-hover:bg-[#F7DF1E]/10 group-hover:border-[#F7DF1E]/30 transition-all duration-300 text-foreground">
                  <FaNodeJs className="w-6 h-6 group-hover:text-[#F7DF1E] transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">JavaScript (Node)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A pure Node.js environment with a built-in console. Perfect for testing algorithms and standard output.
                </p>
              </div>
              <div className="p-4 px-8 border-t border-border/40 flex items-center justify-between text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-sm font-medium">Launch</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 2: Web */}
          <Link href="/playground/web" className="group outline-none block h-full">
            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-card hover:border-[#E34F26]/50 hover:shadow-[0_8px_30px_rgb(227,79,38,0.08)]">
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border/60 group-hover:bg-[#E34F26]/10 group-hover:border-[#E34F26]/30 transition-all duration-300 text-foreground">
                    <FaHtml5 className="w-6 h-6 group-hover:text-[#E34F26] transition-colors" />
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border/60 group-hover:bg-[#1572B6]/10 group-hover:border-[#1572B6]/30 transition-all duration-300 text-foreground">
                    <FaCss3Alt className="w-6 h-6 group-hover:text-[#1572B6] transition-colors" />
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border/60 group-hover:bg-[#F7DF1E]/10 group-hover:border-[#F7DF1E]/30 transition-all duration-300 text-foreground">
                    <SiJavascript className="w-5 h-5 group-hover:text-[#F7DF1E] transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Web Stack</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A full frontend environment. Write HTML, style with CSS, and add logic with JavaScript. Includes a live preview.
                </p>
              </div>
              <div className="p-4 px-8 border-t border-border/40 flex items-center justify-between text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-sm font-medium">Launch</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 3: React */}
          <Link href="/playground/react" className="group outline-none block h-full">
            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-card hover:border-[#61DAFB]/50 hover:shadow-[0_8px_30px_rgb(97,218,251,0.08)]">
              <div className="p-8 flex flex-col flex-1">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 border border-border/60 group-hover:bg-[#61DAFB]/10 group-hover:border-[#61DAFB]/30 transition-all duration-300 text-foreground">
                  <FaReact className="w-6 h-6 group-hover:text-[#61DAFB] transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">React.js</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A complete React environment with JSX support. Build interactive UI components with immediate live feedback.
                </p>
              </div>
              <div className="p-4 px-8 border-t border-border/40 flex items-center justify-between text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-sm font-medium">Launch</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
