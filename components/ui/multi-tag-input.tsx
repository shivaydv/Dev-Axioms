"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface MultiTagInputProps {
  // Form integration props
  name?: string; // For the hidden input
  defaultTags?: string[]; // Initial tags (uncontrolled)

  // External control props (optional)
  tags?: string[]; // External control (controlled)
  onChange?: (tags: string[]) => void; // External control callback

  // Component props
  label?: string;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  tagClassName?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

const MultiTagInput: React.FC<MultiTagInputProps> = ({
  // Form integration
  name,
  defaultTags = [],

  // External control (optional)
  tags: externalTags,
  onChange: externalOnChange,

  // Component props
  label,
  placeholder = "Add a tag...",
  maxTags,
  allowDuplicates = false,
  required = false,

  className = "",
  inputClassName = "",
  tagClassName = "",
  emptyMessage = "No tags added yet",
  disabled = false,
}) => {
  // Internal state management
  const [internalTags, setInternalTags] = useState<string[]>(defaultTags);
  const [inputValue, setInputValue] = useState("");

  // Determine if component is controlled or uncontrolled
  const isControlled = externalTags !== undefined;
  const currentTags = isControlled ? externalTags : internalTags;

  // Update internal tags when external tags change (controlled mode)
  useEffect(() => {
    if (isControlled && externalTags) {
      setInternalTags(externalTags);
    }
  }, [isControlled, externalTags]);

  const updateTags = (newTags: string[]) => {
    if (!isControlled) {
      setInternalTags(newTags);
    }

    // Always call external onChange if provided
    if (externalOnChange) {
      externalOnChange(newTags);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;
    if (disabled) return;
    if (maxTags && currentTags.length >= maxTags) return;

    if (!allowDuplicates && currentTags.includes(trimmedValue)) {
      setInputValue("");
      return;
    }

    const newTags = [...currentTags, trimmedValue];
    updateTags(newTags);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    if (disabled) return;
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    updateTags(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputValue && currentTags.length > 0) {
      removeTag(currentTags[currentTags.length - 1]);
    }
  };

  // Fix the boolean logic to ensure proper boolean values
  const isAtLimit: boolean = Boolean(maxTags && currentTags.length >= maxTags);
  const isInputDisabled: boolean = disabled || isAtLimit;
  const isButtonDisabled: boolean = !inputValue.trim() || disabled || isAtLimit;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} required={required} value={JSON.stringify(currentTags)} />
      )}

      {label && (
        <Label className="flex items-center gap-1 text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="flex gap-2">
        <Input
          placeholder={
            isAtLimit
              ? `Maximum ${maxTags} tags allowed`
              : disabled
                ? "Input disabled"
                : placeholder
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isInputDisabled}
          className={`focus:border-primary focus:ring-primary/20 transition-all duration-200 ${inputClassName}`}
        />
        <Button
          type="button"
          onClick={addTag}
          size="sm"
          variant="outline"
          disabled={isButtonDisabled}
          className="hover:bg-primary hover:text-primary-foreground px-3 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 flex justify-between gap-2">
        {/* Tags Display */}
        <div className="= flex min-h-[2rem] flex-wrap gap-2">
          {currentTags.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              {emptyMessage}
            </p>
          ) : (
            currentTags.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="secondary"
                className={`flex items-center gap-1 px-2 py-1 transition-all duration-200 ${
                  disabled ? "opacity-50" : ""
                } ${tagClassName}`}
              >
                {tag}
                <span
                  onClick={() => removeTag(tag)}
                  className={`flex items-center p-0 transition-colors ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:text-red-600"
                  }`}
                  role="button"
                  aria-label={`Remove ${tag} tag`}
                  tabIndex={disabled ? -1 : 0}
                >
                  <X className="h-3 w-3" />
                </span>
              </Badge>
            ))
          )}
        </div>
        {maxTags && (
          <p
            className={`${currentTags.length >= maxTags ? "text-amber-600" : ""} ${disabled ? "opacity-50" : ""} text-muted-foreground flex items-center justify-end px-2 text-sm`}
          >
            {currentTags.length}/{maxTags}
          </p>
        )}
      </div>
    </div>
  );
};

export { MultiTagInput };
