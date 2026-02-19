import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbr";
import Footer from "./components/Footer";
import FullPageLoader from "./components/LoaderFull";
import Evenet from "./Page/Event/Evenet";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./Page/AboutUs/AboutUs";
import NotFound from "./components/NotFound";

// Lazy load pages
const Home = lazy(() => import("./Page/Home/Home"));
const Register = lazy(() => import("./Page/Register/Register"));
const EditRegistration = lazy(() =>
  import("./Page/Register/Components/EditRegistration")
);

const App = () => {
  return (
    <>
    <ScrollToTop/>
      <Toaster position="bottom-right" />

      <Navbar />

      {/* 🚀 Lazy loading wrapper */}
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editdetails" element={<EditRegistration />} />
          <Route path="/event" element={<Evenet/>}/>
          <Route path="/about" element={<AboutUs/>}/>

          {/* Not Found Page*/}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
};

export default App;
