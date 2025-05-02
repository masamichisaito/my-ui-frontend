import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>ユーザー管理アプリ</h2>
      <button onClick={() => navigate('/register')}>新規登録</button>
      <button onClick={() => navigate('/list')}>登録一覧を見る</button>
    </div>
  );
}
