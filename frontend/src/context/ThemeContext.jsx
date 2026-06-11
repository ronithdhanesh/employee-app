import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )

    function toggleTheme() {
        setTheme((prev)=>prev === "light" ? "dark" : "light")
    }

    useEffect(()=>{
        localStorage.setItem("theme", theme)
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [theme])



    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () =>{
    return useContext(ThemeContext)
}