import { CssBaseline } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createContext, SetStateAction, useState } from 'react';

interface ThemeContextProps {
  children: JSX.Element
}

export interface IThemeContext {
  darkMode: boolean;
  setDarkMode: (val: SetStateAction<boolean>) => void;
}

export const themeContext = createContext({});

const ThemeContext = ({ children }: ThemeContextProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        light: '#FFF',
        main: '#1D213A',
        dark: '#1D213A'
      },
      secondary: {
        light: '#EBEBEB',
        main: '#100E1C',
        dark: '#100E1C'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <themeContext.Provider value={{ darkMode, setDarkMode }}>
        <CssBaseline />
        {children}
      </themeContext.Provider>
    </ThemeProvider>
  );
};

export default ThemeContext;