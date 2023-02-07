import type { AppProps } from "next/app";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000080",
        light: "#4c2eb1",
        dark: "#000053",
      },
      secondary: {
        main: "#ff7f50",
        light: "#ffb07e",
        dark: "#c64f24",
      },
      background: {
        default: "#eeeeee",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
