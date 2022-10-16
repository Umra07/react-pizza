import React, { useState } from 'react';
import Header from './components/Header';
import './scss/app.scss';
import axios from 'axios';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
