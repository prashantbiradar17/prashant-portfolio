import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {cn} from "@/lib/utils";




export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme==="dark"){
      setIsDarkMode(true)
      document.documentElement.classList.add("dark");
    }
    else{
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);




  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="fixed top-20 right-4 md:top-4 md:right-12 z-40 md:z-50">
      <button
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className={cn("p-2 rounded-full transition-colors duration-300", "bg-background/60 backdrop-blur-sm shadow-sm hover:bg-background/80")}
      >
        {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
      </button>
    </div>
  );
};
