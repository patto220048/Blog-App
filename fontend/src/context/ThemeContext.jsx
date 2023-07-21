import React, {createContext, useState} from "react";

export const ThemeContext = createContext({theme: 'light', undefined})

export const ThemeProvider = ({children}) => {
    
    const modeTheme = localStorage.getItem('mode')

    const [theme, setTheme] = useState(modeTheme ? modeTheme : "light")
    return <ThemeContext.Provider value={{theme, setTheme}} >
        {children}
    </ThemeContext.Provider>
}