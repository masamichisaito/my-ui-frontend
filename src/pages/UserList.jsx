import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/users');
        if (!res.ok) throw new Error('取得に失敗');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        alert('ユーザー一覧の取得に失敗しました');
      }
    })();
  }, []);

  return (
    <div>
      <h2>登録済みユーザー一覧</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            氏名: {user.name}, 年齢: {user.age}, メール: {user.email}, 趣味: {user.hobby}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>トップに戻る</button>
    </div>
  );
}
