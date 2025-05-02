import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; // ← スタイル読み込み

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        if (!res.ok) throw new Error('取得に失敗');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        alert('ユーザー一覧の取得に失敗しました');
      }
    })();
  }, []);

  return (
    <div className="user-list-container">
      <h2>登録済みユーザー一覧</h2>
      {users.map((user, idx) => (
        <div key={idx} className="user-card">
          <p><strong>氏名:</strong> {user.name}</p>
          <p><strong>年齢:</strong> {user.age}</p>
          <p><strong>メール:</strong> {user.email}</p>
          <p><strong>趣味:</strong> {user.hobby}</p>
        </div>
      ))}
      <button onClick={() => navigate('/')}>トップに戻る</button>
    </div>
  );
}
