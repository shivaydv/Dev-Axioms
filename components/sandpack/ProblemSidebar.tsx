"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProblemSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  width: number;
}

export default function ProblemSidebar({ isVisible, onClose, width }: ProblemSidebarProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="bg-[#252526] border-r border-gray-700 flex-shrink-0"
      style={{ width: `${width}px`, minWidth: '280px', maxWidth: '500px' }}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 className="text-sm font-semibold">Problem Statement</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="text-gray-300 space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-white">Description</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Write a function that solves the given problem. The function should handle edge cases and return the expected output format.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-white">Examples</h4>
              <div className="bg-[#1e1e1e] p-3 rounded border border-gray-700 text-sm font-mono">
                <div className="text-gray-400">Input:</div>
                <div className="text-blue-400 ml-2">[1, 2, 3]</div>
                <div className="text-gray-400 mt-2">Output:</div>
                <div className="text-green-400 ml-2">[3, 2, 1]</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-white">Constraints</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 1 ≤ n ≤ 1000</li>
                <li>• Time complexity: O(n)</li>
                <li>• Space complexity: O(1)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-white">Hints</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <div className="bg-[#1e1e1e] p-2 rounded border border-gray-700">
                  💡 Try using two pointers approach
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
