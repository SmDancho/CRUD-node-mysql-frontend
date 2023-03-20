import React from 'react';

import { MainPage } from './pages/main';
import { AuthForm } from './components/auth';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/" element={<AuthForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
