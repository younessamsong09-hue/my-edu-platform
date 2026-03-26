import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

interface Subject {
  id: number
  name: string
  name_ar: string
  icon: string
  color: string
  description: string
  level: string
}

export default function CoursesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubjects()
  }, [])

  async function fetchSubjects() {
    setLoading(true)
    setError(null)
    
    console.log('جاري جلب المواد من Supabase...')
    
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('order_num')

    if (error) {
      console.error('خطأ في جلب المواد:', error)
      setError('فشل في تحميل المواد: ' + error.message)
    } else {
      console.log('تم جلب المواد:', data)
      setSubjects(data || [])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <div style={{ fontSize: '24px', color: '#667eea' }}>⏳</div>
        <h2 style={{ marginTop: '20px', color: '#666' }}>جاري تحميل المواد...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <div style={{ fontSize: '24px', color: '#ef4444' }}>⚠️</div>
        <h2 style={{ marginTop: '20px', color: '#666' }}>خطأ في التحميل</h2>
        <p style={{ color: '#999' }}>{error}</p>
        <button 
          onClick={() => fetchSubjects()}
          style={{
            marginTop: '20px',
            background: '#667eea',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (subjects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <div style={{ fontSize: '24px' }}>📚</div>
        <h2 style={{ marginTop: '20px', color: '#666' }}>لا توجد مواد دراسية</h2>
        <p style={{ color: '#999' }}>سيتم إضافة المواد قريباً</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>📚 المواد الدراسية</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>اختر المادة التي تريد دراستها</p>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {subjects.map((subject) => (
            <Link to={`/courses/${subject.id}`} key={subject.id} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}>
                <div style={{
                  background: subject.color || '#667eea',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '70px' }}>{subject.icon}</span>
                </div>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1f2937' }}>{subject.name_ar}</h3>
                  <p style={{ color: '#6b7280', marginBottom: '20px', lineHeight: '1.5' }}>
                    {subject.description || `دروس شاملة في مادة ${subject.name_ar}`}
                  </p>
                  <div style={{
                    background: '#f3f4f6',
                    color: '#667eea',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    display: 'inline-block',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {subject.level === 'all' ? 'جميع المستويات' : 
                     subject.level === 'jtm' ? 'الجذع المشترك' :
                     subject.level === '1bac' ? 'الأولى باك' :
                     subject.level === '2bac' ? 'الثانية باك' : subject.level}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
