import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Header from './components/Layout/Header';
import Pagenotfound from './pages/Pagenotfound';
import PrivateRoute from './pages/PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
              <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
              <Route path="*" element={<Pagenotfound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
