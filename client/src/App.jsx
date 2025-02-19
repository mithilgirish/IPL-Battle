import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Footer from './components/footer';
import NotFound from './pages/notfound';
import Dashboard from './pages/dashboard';
import LoginOC from './pages/loginOC';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login/ecell" element={<LoginOC/>} />
        <Route path="dashboard" element={<Dashboard/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
