import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from "./components/Authorization/Authorization";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import User from './components/User/User';
import { CssBaseline } from '@mui/material';

const theme = createTheme();

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/user" element={!user ? <Authorization /> : <User />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  )
};

export default App;
