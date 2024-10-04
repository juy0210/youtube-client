// Context 기본 설정
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ Children }) => {
  // 테마 상태
  const [theme, setTheme] = useState("lighe");

  // 테마 변경 기능
  const toggleTheme = () => {
    // 조건문
    // if (theme === "light") setTheme("dark");
    // else setTheme("light");

    // or

    // 삼항연산자문
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {Children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
