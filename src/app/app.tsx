import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './(auth)/login/login';
import Register from './(auth)/signup/signup';




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
