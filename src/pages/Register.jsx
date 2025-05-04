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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) setForm(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!form.email.includes('@')) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!form.name) newErrors.name = '氏名は必須です';
    if (!form.age) newErrors.age = '年齢は必須です';
    if (!form.hobby) newErrors.hobby = '趣味は必須です';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('userData', JSON.stringify(form));
      navigate('/confirm');
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <h2>ユーザー登録</h2>

        <label>
          メール:
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label><br />

        <label>
          氏名:
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label><br />

        <label>
          年齢:
          <input name="age" type="number" value={form.age} onChange={handleChange} />
          {errors.age && <span className="error">{errors.age}</span>}
        </label><br />

        <label>
          趣味:
          <input name="hobby" value={form.hobby} onChange={handleChange} />
          {errors.hobby && <span className="error">{errors.hobby}</span>}
        </label><br />

        <button type="submit">確認画面へ</button>
      </form>
    </div>
  );
}
