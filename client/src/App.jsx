import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';

import Home from './pages/home';
import Login from './pages/login';
import Footer from './components/footer';
<<<<<<< HEAD
import NotFound from './pages/notfound';
import LoginOC from './pages/loginOC';
import Rules from './pages/rules';
import Participant from './pages/participant';
import Auctioneer from './pages/auctioneer';
import Admin from './pages/rooms';
=======
import Rules from './pages/rules';

import Participant from './pages/participant';
import Auctioneer from './pages/auctioneer'
import Admin from './pages/rooms'

>>>>>>> upstream/main

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/login/ecell" element={<LoginOC />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/participant/login" element={<Login />} />
        <Route path="/auctioneer/login" element={<Login />} />
        <Route path="/admin/login" element={<Login isAdmin={true} />} />
=======
        <Route path="/rules" element={<Rules/>}/>

        <Route path="/participant/login" element={<Login/>} />
        <Route path="/auctioneer/login" element={<Login/>} />
        <Route path="/admin/login" element={<Login isAdmin={true} />} />

>>>>>>> upstream/main
        <Route path="/participant/:room_id" element={<Participant />} />
        <Route path="/auctioneer/:room_id" element={<Auctioneer />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/:room_id" element={<Auctioneer />} />
<<<<<<< HEAD
        <Route path="*" element={<NotFound />} />
=======
>>>>>>> upstream/main
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
