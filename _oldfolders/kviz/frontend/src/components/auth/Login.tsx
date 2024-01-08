import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  type Form = {
    email: string;
    password: string;
  };

  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/users/login', form);
    if (res.data) {
      console.log(res.data);
    } else console.log('Hiba a fetch soran');
  };

  return (
    <div>
      <h2>Belejelentkezes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type='submit'>Belepes</button>
      </form>
    </div>
  );
};

export default Login;
