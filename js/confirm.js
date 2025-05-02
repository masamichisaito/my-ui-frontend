const data = JSON.parse(localStorage.getItem('userData'));
const area = document.getElementById('confirmArea');

if (!data) {
  alert('確認データが存在しません');
  location.href = 'form.html';
}

// 表示内容を構築
area.innerHTML = `
  <p>メール: ${data.email}</p>
  <p>氏名: ${data.name}</p>
  <p>年齢: ${data.age}</p>
  <p>趣味: ${data.hobby}</p>
`;

// 戻るボタン → form.html に戻る
document.getElementById('backBtn').onclick = () => {
  window.location.href = 'form.html';
};

// 登録ボタン → APIへ送信
document.getElementById('submitBtn').onclick = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      localStorage.removeItem('userData');
      location.href = 'done.html';
    } else {
      const err = await res.text();
      alert('登録失敗: ' + err);
    }
  } catch (err) {
    alert('通信エラー: ' + err.message);
  }
};
