document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const user = {};
  formData.forEach((value, key) => {
    user[key] = value;
  });

  localStorage.setItem('userData', JSON.stringify(user));
  window.location.href = 'confirm.html';
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('userData'));
  if (saved) {
    document.querySelector('input[name="email"]').value = saved.email || '';
    document.querySelector('input[name="name"]').value = saved.name || '';
    document.querySelector('input[name="age"]').value = saved.age || '';
    document.querySelector('input[name="hobby"]').value = saved.hobby || '';
  }
});
