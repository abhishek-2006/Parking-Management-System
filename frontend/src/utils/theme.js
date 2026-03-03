export const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("parkman-theme");
    if (savedTheme) return savedTheme === "dark";
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const toggleTheme = (isDark) => {
  const root = window.document.documentElement;
  if (isDark) {
    root.classList.add("dark");
    localStorage.setItem("parkman-theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("parkman-theme", "light");
  }
};