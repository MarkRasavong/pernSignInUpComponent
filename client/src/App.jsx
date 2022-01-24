import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";

import Authorization from "./components/Authorization/Authorization";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <Authorization />
      </ThemeProvider>
    </React.Fragment>
  )
};

export default App;
