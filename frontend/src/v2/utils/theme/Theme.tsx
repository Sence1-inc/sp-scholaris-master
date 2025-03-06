import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import components from './Components';
import typography from './Typography';
import { shadows, darkshadows } from './Shadows';
import { DarkThemeColors } from './DarkThemeColors';
import { LightThemeColors } from './LightThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';

export interface AppState {
  customizer: {
    activeMode: 'light' | 'dark';
    activeDir: string;
    activeTheme: string;
    borderRadius: number;
  };
}
const defaultCustomizer = {
  activeMode: 'light' as const,
  activeDir: 'ltr',
  activeTheme: 'BLUE_THEME',
  borderRadius: 8,
};

export const buildThemeWithConfig = (
  config: { direction?: string; theme?: string } = {},
  activeMode: 'light' | 'dark',
  borderRadius: number
) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);
  
  const defaultTheme = activeMode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow = activeMode === 'dark' ? darkshadows : shadows;
  const themeSelect = activeMode === 'dark' ? darkthemeOptions : themeOptions;
  
  const baseMode = {
    palette: {
      mode: activeMode,
    },
    shape: {
      borderRadius: borderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };
  
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );
  
  theme.components = components(theme);
  return theme;
};

// Component version that uses Redux hooks
const ThemeSettings = () => {
  // Safely access the customizer state with a fallback
  const customizer = useSelector((state: AppState) => state.customizer) || defaultCustomizer;
  
  // Check if any of the values are undefined and use defaults if they are
  const activDir = customizer.activeDir || defaultCustomizer.activeDir;
  const activeTheme = customizer.activeTheme || defaultCustomizer.activeTheme;
  const activeMode = customizer.activeMode || defaultCustomizer.activeMode;
  const borderRadius = customizer.borderRadius || defaultCustomizer.borderRadius;
  
  const theme = buildThemeWithConfig(
    {
      direction: activDir,
      theme: activeTheme,
    },
    activeMode,
    borderRadius
  );
  
  useEffect(() => {
    document.dir = activDir;
  }, [activDir]);

  return theme;
};

// Fallback theme that doesn't rely on Redux
export const getDefaultTheme = () => {
  return buildThemeWithConfig(
    { 
      direction: defaultCustomizer.activeDir,
      theme: defaultCustomizer.activeTheme
    },
    defaultCustomizer.activeMode,
    defaultCustomizer.borderRadius
  );
};

export { ThemeSettings };