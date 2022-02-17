import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from "./components/Authorization/Authorization";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import User from './components/User/User';
import { CssBaseline } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import RequireAuth from './components/RequireAuth';
import AdminDash from './components/AdminDash/AdminDash';
import Unauthorized from './components/Unauthorized/Unauthorized';

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
              <Route element={<RequireAuth allowedRoles={[process.env.REACT_APP_CODIGO_USARIO, process.env.REACT_APP_CODIGO_ADMIN]} />}>
                <Route exact path="/user" element={<User />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[process.env.REACT_APP_CODIGO_ADMIN]} />}>
                <Route exact path="/admin" element={<AdminDash />} />
              </Route>
              <Route path="unauthorized" element={<Unauthorized />} />
            { /* Catch All */ }
          </Routes>
        </ThemeProvider>
  )
};

export default App;
