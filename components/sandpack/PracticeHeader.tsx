"use client";

import { Button } from "@/components/ui/button";
import { Timer } from "@/components/Timer";
import { Sidebar, PanelLeftClose, PanelLeft } from "lucide-react";
import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";

interface PracticeHeaderProps {
    timeLimit?: number;
    onTimeUp?: () => void;
    onSubmit?: () => void;
    onToggleSidebar?: () => void;
    isSidebarCollapsed?: boolean;
    isSidebarVisible?: boolean;
}


export default function PracticeHeader({
    timeLimit,
    onTimeUp,
    onSubmit,
    onToggleSidebar,
    isSidebarCollapsed,
    isSidebarVisible = true,
}: PracticeHeaderProps) {
    // Determine the appropriate icon and tooltip based on sidebar state
    const getSidebarIcon = () => {
        if (!isSidebarVisible) {
            return <PanelLeft className="h-4 w-4" />;
        } else if (isSidebarCollapsed) {
            return <PanelLeft className="h-4 w-4" />;
        } else {
            return <PanelLeftClose className="h-4 w-4" />;
        }
    };

    const getSidebarTooltip = () => {
        if (!isSidebarVisible) {
            return "Show Sidebar";
        } else if (isSidebarCollapsed) {
            return "Hide Sidebar";
        } else {
            return "Hide Sidebar";
        }
    };
    return (
        <div className=" border-b  px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-between">
                {/* Left Section - Logo and Navigation */}
                <div className="flex items-center space-x-2">
                    <Logo />

                </div>
                <div className="flex items-center space-x-2">
                    {timeLimit && onTimeUp && (
                        <Timer timeLimit={timeLimit} onTimeUp={onTimeUp} />
                    )}
                    <ThemeToggle className="rounded-md" />
                    {onToggleSidebar && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleSidebar}
                            className="rounded-md"
                            title={getSidebarTooltip()}
                        >
                            {getSidebarIcon()}
                        </Button>
                    )}

                    {onSubmit && (
                        <Button
                            onClick={onSubmit}
                            variant={"default"}
                            size={"sm"}
                            className="rounded-md font-semibold bg-green-600 hover:bg-green-700 text-white"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
