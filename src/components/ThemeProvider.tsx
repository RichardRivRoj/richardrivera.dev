"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);

  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Inicialización lazy: lee localStorage y calcula el tema inicial
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    return storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
      ? storedTheme
      : "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    const initialTheme: Theme =
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
        ? storedTheme
        : "system";

    return initialTheme === "system" ? getSystemTheme() : initialTheme;
  });

  // Aplicar el tema al DOM solo una vez al montar (no llama setState)
  useEffect(() => {
    applyTheme(resolvedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Escucha cambios en la preferencia del sistema operativo.
   * (Solo cuando el tema elegido es "system")
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme !== "system") {
        return;
      }

      const nextTheme = event.matches ? "dark" : "light";

      setResolvedTheme(nextTheme);
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  /**
   * Cambia explícitamente el tema.
   */
  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);

    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

    const actualTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;

    setResolvedTheme(actualTheme);
    applyTheme(actualTheme);
  }, []);

  /**
   * Alterna entre light y dark.
   */
  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "light" ? "dark" : "light";

    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
