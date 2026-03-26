import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function HomePage() {
  const [stats, setStats] = useState({ subjects: 0, lessons: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const { count: subjectsCount } = await supabase
        .from('subjects')
        .select('*', { count: 'exact', head: true })
      
      const { count: lessonsCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true)

      setStats({
        subjects: subjectsCount || 0,
        lessons: lessonsCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎓 بوابة المعرفة المغربية</h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>أول منصة تعليمية مغربية شاملة للجميع</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 20px' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#667eea' }}>
              {loading ? '...' : stats.subjects}
            </div>
            <div style={{ color: '#666', marginTop: '5px' }}>مادة دراسية</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#667eea' }}>
              {loading ? '...' : stats.lessons}
            </div>
            <div style={{ color: '#666', marginTop: '5px' }}>درس تفاعلي</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>📹</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>دروس فيديو</h3>
            <p style={{ color: '#666' }}>دروس عالية الجودة لجميع المواد والمستويات</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>📝</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>تمارين تفاعلية</h3>
            <p style={{ color: '#666' }}>تمارين مع تصحيح فوري لقياس مستواك</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎯</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>امتحانات وطنية</h3>
            <p style={{ color: '#666' }}>جميع الامتحانات مع الحلول المفصلة</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/courses">
            <button style={{
              background: '#764ba2',
              color: 'white',
              padding: '15px 40px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}>
              استكشف الدروس الآن →
            </button>
          </Link>
        </div>
      </div>

      <footer style={{ background: '#1f2937', color: 'white', textAlign: 'center', padding: '30px', marginTop: '60px' }}>
        <p>© 2025 بوابة المعرفة المغربية</p>
        <p style={{ opacity: 0.7, marginTop: '10px', fontSize: '14px' }}>معًا نبني مستقبل التعليم في المغرب</p>
      </footer>
    </div>
  )
}
