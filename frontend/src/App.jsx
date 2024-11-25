// App.jsx
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route path='/' element={<Home />} />
          <Route path="/search" element={'search'} />
          <Route path="/notification" element={'notification'} />
          <Route path="/message" element={'message'} />
          <Route path="/posting" element={'posting'} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;