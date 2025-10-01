"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, Check, Twitter, Linkedin, Link } from "lucide-react";
import { Question } from "@/types/Question";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
}

export function ShareModal({ isOpen, onClose, question }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/practice/${question.slug}`;
  }, [question.slug]);

  const shareText = `${question.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(
      " ",
    )} (${question.difficulty} level) - Try solving this question on DevAxioms.`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText,
        )}&url=${encodeURIComponent(currentUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      action: () => {
        const url = `https://www.linkedin.com/?shareActive=true&mini=true&text=${encodeURIComponent(shareText + " " + currentUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Share This Question
          </DialogTitle>
          <DialogDescription>
            Share the question via Twitter or LinkedIn
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* URL Copy Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input
                value={currentUrl}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="px-3"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <Check className="h-3 w-3" />
                Link copied to clipboard!
              </p>
            )}
          </div>

          {/* Social Share Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Share on</label>
            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  onClick={option.action}
                  className="h-12 justify-start gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
