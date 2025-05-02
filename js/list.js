window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/users');
    if (!res.ok) throw new Error('取得に失敗');
    const users = await res.json();

    const list = document.getElementById('userList');
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `氏名: ${user.name}, 年齢: ${user.age}, メール: ${user.email}, 趣味: ${user.hobby}`;
      list.appendChild(li);
    });
  } catch (err) {
    alert('ユーザー一覧の取得に失敗しました');
  }
});
