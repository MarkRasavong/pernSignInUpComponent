import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from "./components/Authorization/Authorization";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import User from './components/User/User';
import { CssBaseline } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import RequireAuth from './components/RequireAuth';

const theme = createTheme();

const App = () => {

  return (
        <ThemeProvider theme={theme}>
          <NavBar />
          <CssBaseline />
          <Routes>
            {/* Public Route(s) */}
              <Route exact path="/" element={<Authorization />} />
            {/* Protected Route(s)*/}
              <Route element={<RequireAuth />}>
              <Route exact path="/user" element={<User />} />
              </Route>
            { /* Catch All */ }
          </Routes>
        </ThemeProvider>
  )
};

export default App;
