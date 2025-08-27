"use client";

import { Button } from "@/components/ui/button";
import { X, Clock, Code, Tag, Heart, Bookmark, Share2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Question {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    timeLimit: number;
    description: string;
    requirements: string[];
}

interface PracticeSidebarProps {
    question: Question;
    isVisible: boolean;
    onClose: () => void;
    width: number;
}

const difficultyColors = {
    Easy: 'text-green-600 bg-green-50 border-green-200',
    Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    Hard: 'text-red-600 bg-red-50 border-red-200',
};

export default function PracticeSidebar({
    question,
    isVisible,
    onClose,
    width
}: PracticeSidebarProps) {
    if (!isVisible) return null;

    return (
        <div
            className="border-r flex-shrink-0"
            style={{ width: `${width}px`, minWidth: '320px', maxWidth: '500px' }}
        >
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col items-center justify-between p-4 border-b gap-1">
                    <div className="flex items-center justify-between w-full space-x-3">
                        <h3 className="text-lg font-semibold ">{question.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
                            {question.difficulty}
                        </span>
                    </div>
                </div>

                {/* Tags and Actions */}
                <div className="p-4 border-b ">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Category</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                            {question.category}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time Limit</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{question.timeLimit} minutes</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-red-600 "
                            >
                                <Heart className="w-4 h-4 mr-1" />
                                Like
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-blue-600 "
                            >
                                <Bookmark className="w-4 h-4 mr-1" />
                                Save
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground "
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 space-y-6">
                    {/* Description */}
                    <div>
                        <h4 className="font-semibold mb-3  flex items-center">
                            <Code className="w-4 h-4 mr-2" />
                            Problem Description
                        </h4>
                        <div className="text-sm text-muted-foreground leading-relaxed p-3 rounded-lg border ">
                            {question.description}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Requirements
                        </h4>
                        <ul className="space-y-2">
                            {question.requirements.map((req, index) => (
                                <li key={index} className="flex items-start space-x-3 text-sm">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tips */}
                    <div>
                        <h4 className="font-semibold mb-3  flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Tips & Hints
                        </h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                            <div className="text-sm font-medium text-blue-900">💡 Pro Tips</div>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Start with the basic structure first</li>
                                <li>• Test your code frequently</li>
                                <li>• Pay attention to edge cases</li>
                                <li>• Use meaningful variable names</li>
                                <li>• Consider accessibility features</li>
                            </ul>
                        </div>
                    </div>

                    {/* Examples */}
                    <div>
                        <h4 className="font-semibold mb-3 ">Expected Outcome</h4>
                        <div className=" border  rounded-lg p-3">
                            <div className="text-xs font-medium mb-2">Preview:</div>
                            <div className="text-sm ">
                                Your component should be interactive and responsive
                            </div>
                        </div>
                    </div>

                    {/* Difficulty Info */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="font-medium text-gray-900 mb-1">Difficulty</div>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
                                    {question.difficulty}
                                </div>
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 mb-1">Estimated Time</div>
                                <div className="text-gray-600">{question.timeLimit} min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
