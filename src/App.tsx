import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import TagPage from './pages/TagPage';
const Layout = () => {
  return (
    <div>
      <Nav/>
      <Outlet />
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path="/tag/:tagName" element={<TagPage />} />
          <Route path="/archive" element={<MainPage />} />
          <Route path="/trash" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
