import React from "react";
import Navbar from "./components/Navbr";
import Home from "./Page/Home/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Register from "./Page/Register/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>}/>

      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
