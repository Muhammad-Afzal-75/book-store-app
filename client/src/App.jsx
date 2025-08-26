// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Course from './components/Course';
import About from './components/About';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import BookDetails from './components/BookDetails';
import { useAuth } from './contest/AuthProvider';

const App = () => {
  const {authUser, setAuthUser} = useAuth()
console.log(authUser)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme globally
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors">
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={authUser?<Course />:<Navigate to='/signup'/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={authUser?.isAdmin?<Dashboard />:<Navigate to='/signup'/>} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer/>
     
    </div>
  );
};

export default App;
