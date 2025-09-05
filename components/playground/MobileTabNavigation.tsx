"use client";

import { Button } from "@/components/ui/button";
import { FileText, Code, Eye, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileView, MobileViewType } from "@/store/MobileViewStore";

const tabs = [
  { id: 'description' as MobileViewType, label: 'Question', icon: FileText },
  { id: 'editor' as MobileViewType, label: 'Editor', icon: Code },
  { id: 'preview' as MobileViewType, label: 'Preview', icon: Eye },
];

interface MobileTabNavigationProps {
  onToggleConsole?: () => void;
  isConsoleVisible?: boolean;
}

export function MobileTabNavigation({ onToggleConsole, isConsoleVisible }: MobileTabNavigationProps) {
  const { activeView, setActiveView } = useMobileView();
  const isConsoleAvailable = activeView === 'editor' || activeView === 'preview';

  return (
    <div className="bg-background border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between p-2">
        {/* Enhanced Tab Bar */}
        <div className="flex items-center bg-muted/50 rounded-2xl p-1 gap-0.5 flex-1 mr-3 border border-border/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-75 flex-1 min-h-[40px]",
                  isActive
                    ? "bg-background text-foreground shadow-md border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-colors duration-150",
                  isActive ? "text-primary" : ""
                )} />
                <span className="hidden sm:inline font-medium tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Console Button */}
        <Button
          variant={isConsoleAvailable && isConsoleVisible ? "default" : "outline"}
          size="sm"
          onClick={isConsoleAvailable ? onToggleConsole : undefined}
          disabled={!isConsoleAvailable}
          className={cn(
            "h-[40px] px-3 rounded-xl transition-all duration-200 font-medium shadow-sm min-w-[40px]",
            isConsoleAvailable && isConsoleVisible 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : isConsoleAvailable
                ? "border-border/50 hover:bg-muted/50"
                : "border-border/30 text-muted-foreground/60 cursor-not-allowed",
            !isConsoleAvailable && "opacity-60"
          )}
        >
          <Terminal className="w-4 h-4" />
          <span className="ml-1.5 hidden xs:inline tracking-tight">Console</span>
        </Button>
      </div>
    </div>
  );
}
