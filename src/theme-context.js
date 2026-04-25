import { createContext, useContext } from 'react';
import { themes, defaultThemeId } from './themes.js';

export const ThemeContext = createContext(themes[defaultThemeId]);
export const useTheme = () => useContext(ThemeContext);
