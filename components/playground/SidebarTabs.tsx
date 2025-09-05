"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/types/Question";
import {
  Clock,
  Code,
  Tag,
  Heart,
  Bookmark,
  Share2,
  CheckCircle,
  Lightbulb,
  FileText,
  Info,
} from "lucide-react";
import { ReactNode } from "react";

interface PracticeSidebarContentProps {
  question: Question;
}

const difficultyColors = {
  Easy: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800",
  Medium:
    "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-800",
  Hard: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800",
};

// Main export function that creates the tabs
export function createPracticeSidebarTabs(question: Question) {
  return [
    {
      id: "description",
      label: "Description",
      icon: <FileText className="h-4 w-4" />,
      content: <DescriptionContent question={question} />,
    },
    {
      id: "requirements",
      label: "Requirements",
      icon: <CheckCircle className="h-4 w-4" />,
      content: <RequirementsContent question={question} />,
    },
    {
      id: "tips",
      label: "Tips",
      icon: <Lightbulb className="h-4 w-4" />,
      content: <TipsContent question={question} />,
    },
    {
      id: "info",
      label: "Info",
      icon: <Info className="h-4 w-4" />,
      content: <InfoContent question={question} />,
    },
  ];
}

// Description Tab Content
function DescriptionContent({ question }: PracticeSidebarContentProps) {
  return (
    <div className="h-full space-y-4 overflow-y-auto p-4">
      <div>
        <h4 className="mb-3 flex items-center text-sm font-medium">
          <Code className="mr-2 h-4 w-4" />
          Problem Description
        </h4>
        <div className="text-muted-foreground bg-muted/30 rounded-lg border p-3 text-sm leading-relaxed">
          {question.description}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium">Expected Outcome</h4>
        <div className="bg-muted/30 rounded-lg border p-3">
          <div className="text-muted-foreground mb-2 text-xs font-medium">
            Preview:
          </div>
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
    <div className="h-full overflow-y-auto p-4">
      <h4 className="mb-3 flex items-center text-sm font-medium">
        <CheckCircle className="mr-2 h-4 w-4" />
        Requirements
      </h4>
      <ul className="space-y-3">
        {question.requirements.map((req, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm">
            <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"></span>
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
    <div className="h-full overflow-y-auto p-4">
      <h4 className="mb-3 flex items-center text-sm font-medium">
        <Lightbulb className="mr-2 h-4 w-4" />
        Tips & Hints
      </h4>
      <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
          💡 Pro Tips
        </div>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
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
    <div className="h-full space-y-4 overflow-y-auto p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Tag className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">Category</span>
          </div>
          <span className="inline-flex items-center rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400">
            {question.category}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">Time Limit</span>
          </div>
          <span className="text-muted-foreground text-sm">
            {question.timeLimit} minutes
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium">Difficulty</span>
          <span
            className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${difficultyColors[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground flex-1 hover:text-red-600"
          >
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground flex-1 hover:text-blue-600"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground w-full"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
