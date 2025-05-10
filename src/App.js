import logo from './logo.svg';
import './App.css';
import Home from './Home';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistartionPage';
import Todopage from './Todopage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/todopage" element={<Todopage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
