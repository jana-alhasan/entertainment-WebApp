import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Tv from "../pages/Tv";
import BookMarks from "../pages/BookMarks";
import ShowVideoDetails from "../pages/ShowVideoDetails";
import ShowTVDetails from "../pages/ShowTVDetails";
import NotFoundPage from "../pages/NotFoundPage";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Footer from "../components/common/Footer";



function Rotue() {
  return (
    <Router basename="/entertainment-WebApp">
      <Navbar />    
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFoundPage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/movies" element={<Movies />}/>
        <Route path="/tvSeries" element={<Tv />}/>
        <Route path="/bookMarks" element={<BookMarks />}/>
        <Route path="/movies/:id" element={<ShowVideoDetails />}/>
        <Route path="/series/:id" element={<ShowTVDetails />}/>
      </Routes>
      <Footer/>
    </Router>

  );
}

export default Rotue;
