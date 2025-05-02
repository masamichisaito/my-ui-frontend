import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirm() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) {
      alert('確認データが存在しません');
      navigate('/register');
    } else {
      setData(stored);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (res.ok) {
        localStorage.removeItem('userData');
        navigate('/complete');
      } else {
        const errJson = await res.json(); // ← 修正：text() ではなく json()
        alert('登録失敗: ' + (errJson?.errors?.join(', ') || errJson?.error || 'エラー'));
      }
    } catch (err) {
      alert('通信エラー: ' + err.message);
    }
  };  

  if (!data) return null;

  return (
    <div className="page-container">
      <h2>確認画面</h2>
      <p>メール: {data.email}</p>
      <p>氏名: {data.name}</p>
      <p>年齢: {data.age}</p>
      <p>趣味: {data.hobby}</p>
      <button onClick={() => navigate('/register')}>戻る</button>
      <button onClick={handleSubmit}>登録</button>
    </div>
  );
}
