import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './lcmapplication/auth/signup/signup';
import Login from './lcmapplication/auth/login/login';


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
