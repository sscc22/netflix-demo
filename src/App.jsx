import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './utils/Authentication';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import './styles/global.css';

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router basename="/netflix-demo">
      <div className="app">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                  </Routes>
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
