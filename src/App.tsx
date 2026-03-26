import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import './index.css'

function App() {
  return (
    <Router>
      <nav style={{
        background: '#1f2937',
        padding: '15px 20px',
        display: 'flex',
        gap: '30px',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>🏠 الرئيسية</Link>
        <Link to="/courses" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>📚 الدروس</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  )
}

export default App
