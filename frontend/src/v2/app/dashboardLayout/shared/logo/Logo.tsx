import React from 'react';
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { AppState } from "../../../../store/store"; // Update path as needed

// Define interface for your customizer state
interface CustomizerState {
  TopbarHeight: number;
  isCollapse: boolean;
  isSidebarHover: boolean;
  activeDir: string;
  activeMode: string;
}

// Default values to use when Redux state is undefined
const defaultCustomizer: CustomizerState = {
  TopbarHeight: 70,
  isCollapse: false,
  isSidebarHover: false,
  activeDir: 'ltr',
  activeMode: 'light'
};

// Create a regular <a> component styled with MUI instead of Next.js Link
const LinkStyled = styled('a')(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export default function Logo() {
  // Get customizer state from Redux with fallback to default values
  const reduxCustomizer = useSelector((state: AppState) => state.customizer);
  
  // Merge with defaults to handle undefined properties
  const customizer = {
    ...defaultCustomizer,
    ...reduxCustomizer
  };
  
  // Apply the styling directly to the container div instead of the Link component
  const logoContainerStyle = {
    height: customizer.TopbarHeight,
    width: customizer.isCollapse && !customizer.isSidebarHover ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  };

  // Check if activeDir is 'rtl', otherwise default to 'ltr' logic
  if (customizer.activeDir !== "rtl") {
    return (
      <LinkStyled href="/" style={logoContainerStyle}>
        {customizer.activeMode === "dark" ? (
          <img
            src="/images/logos/logo-light.svg"
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            loading="eager"
          />
        ) : (
          <img
            src="/images/logos/logo-dark.svg"
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            loading="eager"
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/" style={logoContainerStyle}>
      {customizer.activeMode === "dark" ? (
        <img
          src="/images/logos/logo-light-rtl.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          loading="eager"
        />
      ) : (
        <img
          src="/images/logos/logo-dark-rtl.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          loading="eager"
        />
      )}
    </LinkStyled>
  );
}