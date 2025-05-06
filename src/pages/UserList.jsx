import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      if (!res.ok) throw new Error('取得に失敗');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert('ユーザー一覧の取得に失敗しました');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('本当に削除しますか？');
    if (!confirmed) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
      method: 'DELETE',
    });

    if (res.status === 204) {
      alert('削除しました');
      fetchUsers(); // 再取得して表示更新
    } else {
      const err = await res.json();
      alert('削除失敗: ' + (err.error || '不明なエラー'));
    }
  };

  return (
    <div className="user-list-container">
      <h2>登録済みユーザー一覧</h2>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p><strong>氏名:</strong> {user.name}</p>
          <p><strong>年齢:</strong> {user.age}</p>
          <p><strong>メール:</strong> {user.email}</p>
          <p><strong>趣味:</strong> {user.hobby}</p>
          <button onClick={() => handleDelete(user.id)}>削除</button>
        </div>
      ))}
      <button onClick={() => navigate('/')}>トップに戻る</button>
    </div>
  );
}
