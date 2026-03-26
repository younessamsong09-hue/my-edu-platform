'use client'
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = async () => {
    const { error } = await supabase.from('students').insert([{ name, email }])
    if (!error) alert('تم التسجيل بنجاح في بوابة المعرفة!')
  }

  return (
    <div dir="rtl" className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">تسجيل طالب جديد</h2>
      <input onChange={(e) => setName(e.target.value)} placeholder="الاسم الكامل" className="w-full p-2 border mb-2 rounded" />
      <input onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="w-full p-2 border mb-4 rounded" />
      <button onClick={handleRegister} className="w-full bg-green-600 text-white py-2 rounded">إرسال الطلب</button>
    </div>
  )
}
