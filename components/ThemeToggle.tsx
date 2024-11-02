"use client";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 't') {
        handleClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  if (!mounted) return <button className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md" disabled ><Sun className="w-5 h-5" /></button>
  return (
    <button onClick={handleClick} className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md">{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
  );
};

export default ThemeToggle;
