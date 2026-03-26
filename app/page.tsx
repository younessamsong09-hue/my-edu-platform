'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubjects() {
      const { data } = await supabase.from('subjects').select('*')
      if (data) setSubjects(data)
      setLoading(false)
    }
    fetchSubjects()
  }, [])

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-blue-600">بوابة المعرفة</h1>
        <p className="text-gray-600 mt-2">اختر مادتك الدراسية وابدأ التعلم</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {loading ? <p className="text-center">جاري تحميل المواد...</p> : 
          subjects.map((sub: any) => (
            <div key={sub.id} className="bg-white p-6 rounded-2xl shadow-sm border-r-4" style={{borderColor: sub.color}}>
              <span className="text-4xl">{sub.icon}</span>
              <h2 className="text-xl font-bold mt-2">{sub.name_ar}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}
