// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/notification" element={<Home />} />
        <Route path="/message" element={<Home />} />
        <Route path="/posting" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;