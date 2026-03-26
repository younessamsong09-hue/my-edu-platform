import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#667eea' }}>🎓 بوابة المعرفة المغربية</h1>
      <p>مرحباً بك في منصة التعليم المغربية</p>
      <Link to="/courses">
        <button style={{ background: '#667eea', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '20px' }}>
          اذهب إلى الدروس
        </button>
      </Link>
    </div>
  )
}

function CoursesPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>📚 قائمة المواد الدراسية</h2>
      <p>سيتم عرض المواد قريباً</p>
      <Link to="/">
        <button>العودة للرئيسية</button>
      </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  )
}

export default App
