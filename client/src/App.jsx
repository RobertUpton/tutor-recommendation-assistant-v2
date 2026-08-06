import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
//import Dashboard from "./pages/Dashboard";
//import Tutors from "./pages/Tutors";
//import Messages from "./pages/Messages";
//import Profile from "./pages/Profile";
//import Settings from "./pages/Settings";
//import Bookings from "./pages/Bookings";
//import BookTutor from "./pages/BookTutor";
//import AIRecommendation from "./pages/AIRecommendation";



// This component handles routes + navbar logic
function AppContent() {

  // Gets current page path
  const location = useLocation();

  return (
    <>

     {/* Hide Navbar on dashboard pages */}
      
      {location.pathname === "/"  && <Navbar />}

      <Routes>
        <Route path="/" element=              {<Home />} />
        <Route path="/login" element=        {<Login />} />
        <Route path="/Register" element=  {<Register />} />
       {/**  <Route path="/Dashboard" element={<Dashboard />} />
        
        
        <Route path="/Tutors" element=      {<Tutors />} />
        <Route path="/messages" element=  {<Messages />} />
        <Route path="/profile" element=    {<Profile />} />
        <Route path="/settings" element=  {<Settings />} />
        <Route path="/bookings" element=  {<Bookings />} />
        <Route path="/book/:id" element= {<BookTutor />} />
        <Route path="/recommendation"element= {<AIRecommendation />} />*/}
      </Routes>

    </>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;