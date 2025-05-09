import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './signup/signup';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
