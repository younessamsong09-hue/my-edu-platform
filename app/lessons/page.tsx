'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LessonsPage() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getLessons() {
      const { data } = await supabase.from('lessons').select('*')
      if (data) setLessons(data)
      setLoading(false)
    }
    getLessons()
  }, [])

  return (
    <div dir="rtl" className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">قائمة الدروس المتاحة</h1>
      {loading ? <p>جاري تحميل الدروس...</p> : (
        <div className="space-y-4">
          {lessons.map((lesson: any) => (
            <div key={lesson.id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <h3 className="font-bold text-blue-700">{lesson.title}</h3>
              <p className="text-sm text-gray-600">{lesson.description}</p>
              <a href={lesson.video_url} target="_blank" className="inline-block mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded">مشاهدة الدرس</a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
