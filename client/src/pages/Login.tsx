import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData = (prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg-cover bg-no-repeat bg-top grow h-full'>
      <div className='mx-auto my-20 p-10 rounded-lg bg-slate-700 py-12 w-[400px] h-auto'>
        <h1 className='text-white font-extrabold text-3xl mb-8'>Login</h1>
        <div className='mb-3'>
          <label
            className='font-semibold text-slate-200 text-sm mb-1 block'
            htmlFor='name'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            className='p-3 w-full rounded-lg bg-slate-600'
          />
        </div>
        <div className='mb-8'>
          <label
            className='font-semibold text-slate-200 text-sm mb-1 block'
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            className='p-3 w-full rounded-lg bg-slate-600'
          />
        </div>
        <button className='p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 rounded font-bold'>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
