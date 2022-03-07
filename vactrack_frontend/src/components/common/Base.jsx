import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "./Header";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "../theme/useDarkMode";
import { GlobalStyles } from "../theme/Globalstyle";
import { lightTheme, darkTheme } from "../theme/Themes";
import Toggle from "../theme/Toggler";

const Base = ({ activeKey, children }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Container fluid className="px-5">
          {/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}
          <Header activeKey={activeKey} />
          {children}
        </Container>
      </>
    </ThemeProvider>
  );
};

export default Base;
