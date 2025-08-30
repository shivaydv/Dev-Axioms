"use client";


import { Button } from "@/components/ui/button";
import { Question } from "@/types/Question";
import { Clock, Code, Tag, Heart, Bookmark, Share2, CheckCircle, Lightbulb, FileText, Info } from "lucide-react";
import { ReactNode } from "react";


interface PracticeSidebarContentProps {
    question: Question;
}

const difficultyColors = {
    Easy: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800',
    Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-800',
    Hard: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800',
};



// Main export function that creates the tabs
export function createPracticeSidebarTabs(question: Question) {
    return [
        {
            id: 'description',
            label: 'Description',
            icon: <FileText className="w-4 h-4" />,
            content: <DescriptionContent question={question} />
        },
        {
            id: 'requirements',
            label: 'Requirements',
            icon: <CheckCircle className="w-4 h-4" />,
            content: <RequirementsContent question={question} />
        },
        {
            id: 'tips',
            label: 'Tips',
            icon: <Lightbulb className="w-4 h-4" />,
            content: <TipsContent question={question} />
        },
        {
            id: 'info',
            label: 'Info',
            icon: <Info className="w-4 h-4" />,
            content: <InfoContent question={question} />
        }
    ];
}

// Description Tab Content
function DescriptionContent({ question }: PracticeSidebarContentProps) {
    return (
        <div className="p-4 space-y-4 h-full overflow-y-auto">
            <div>
                <h4 className="font-medium mb-3 flex items-center text-sm">
                    <Code className="w-4 h-4 mr-2" />
                    Problem Description
                </h4>
                <div className="text-sm text-muted-foreground leading-relaxed p-3 rounded-lg border bg-muted/30">
                    {question.description}
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-3 text-sm">Expected Outcome</h4>
                <div className="border rounded-lg p-3 bg-muted/30">
                    <div className="text-xs font-medium mb-2 text-muted-foreground">Preview:</div>
                    <div className="text-sm">
                        Your component should be interactive and responsive
                    </div>
                </div>
            </div>
        </div>
    );
}

// Requirements Tab Content
function RequirementsContent({ question }: PracticeSidebarContentProps) {
    return (
        <div className="p-4 h-full overflow-y-auto">
            <h4 className="font-medium mb-3 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Requirements
            </h4>
            <ul className="space-y-3">
                {question.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{req}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Tips Tab Content
function TipsContent({ question }: PracticeSidebarContentProps) {
    return (
        <div className="p-4 h-full overflow-y-auto">
            <h4 className="font-medium mb-3 flex items-center text-sm">
                <Lightbulb className="w-4 h-4 mr-2" />
                Tips & Hints
            </h4>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
                <div className="text-sm font-medium text-blue-900 dark:text-blue-100">💡 Pro Tips</div>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Start with the basic structure first</li>
                    <li>• Test your code frequently</li>
                    <li>• Pay attention to edge cases</li>
                    <li>• Use meaningful variable names</li>
                    <li>• Consider accessibility features</li>
                </ul>
            </div>
        </div>
    );
}

// Info Tab Content
function InfoContent({ question }: PracticeSidebarContentProps) {
    return (
        <div className="p-4 space-y-4 h-full overflow-y-auto">
            <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Category</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {question.category}
                    </span>
                </div>

                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Time Limit</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{question.timeLimit} minutes</span>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">Difficulty</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
                        {question.difficulty}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t space-y-2">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-muted-foreground hover:text-red-600"
                    >
                        <Heart className="w-4 h-4 mr-2" />
                        Like
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-muted-foreground hover:text-blue-600"
                    >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground"
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
            </div>
        </div>
    );
}
