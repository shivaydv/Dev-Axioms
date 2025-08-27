"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/Timer";
import { ArrowLeft, BookOpen, Bookmark, Heart, Share2, Code2, SidebarClose, Sidebar } from "lucide-react";

interface PracticeHeaderProps {
    timeLimit?: number;
    onTimeUp?: () => void;
    onSubmit?: () => void;
    isSubmitted?: boolean;
    isSidebarVisible?: boolean;
    onToggleSidebar?: () => void;
}


export default function PracticeHeader({
    timeLimit,
    onTimeUp,
    onSubmit,
    isSubmitted,
    isSidebarVisible,
    onToggleSidebar,
}: PracticeHeaderProps) {
    return (
        <div className=" border-b  px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-between">
                {/* Left Section - Logo and Navigation */}
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center">
                        <Code2 className="h-8 w-8 text-blue-600" />
                    </Link>

                    <div className="h-6 w-px" />



                    {onToggleSidebar && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleSidebar}
                            className="rounded-lg"

                        >
                            <Sidebar className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Right Section - Actions and Timer */}
                <div className="flex items-center space-x-3">

                    {/* Timer */}
                    {timeLimit && onTimeUp && (
                        <Timer timeLimit={timeLimit} onTimeUp={onTimeUp} />
                    )}

                    {/* Submit Button */}
                    {onSubmit && (
                        <Button
                            onClick={onSubmit}
                            disabled={isSubmitted}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isSubmitted ? 'Submitted' : 'Submit Solution'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
