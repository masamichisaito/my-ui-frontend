import React from 'react';
import { Link } from 'react-router-dom';

export default function Complete() {
  return (
    <div className="page-container">
      <h2>登録が完了しました</h2>
      <p>ご登録ありがとうございます。</p>
      <Link to="/">トップページへ戻る</Link>
    </div>
  );
}
