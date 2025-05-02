import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    name: '',
    age: '',
    hobby: '',
  });

  // 登録途中のデータがあれば復元
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) setForm(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(form));
    navigate('/confirm');
  };

  return (
    <div className="page-container">
    <form onSubmit={handleSubmit}>
      <h2>ユーザー登録</h2>
      <label>メール: <input name="email" value={form.email} onChange={handleChange} required /></label><br />
      <label>氏名: <input name="name" value={form.name} onChange={handleChange} required /></label><br />
      <label>年齢: <input name="age" type="number" value={form.age} onChange={handleChange} required /></label><br />
      <label>趣味: <input name="hobby" value={form.hobby} onChange={handleChange} /></label><br />
      <button type="submit">確認画面へ</button>
    </form>
    </div>
  );
}
