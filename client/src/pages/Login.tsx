import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function Login() {
  type Inputs = {
    email: string;
    password: string;
  };

  const schema = z.object({
    email: z
      .string()
      .trim()
      .email()
      .min(1, { message: 'Please enter an email address' }),
    password: z.string().trim().min(1, { message: 'Please enter a password' }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className='bg-cover bg-no-repeat bg-top grow h-full'>
      <div className='mx-auto my-20 p-10 rounded-lg bg-slate-700 py-12 w-[400px] h-auto'>
        <h1 className='text-white font-extrabold text-3xl mb-8'>Login</h1>
        <form>
          <div className='mb-3'>
            <label
              className='font-semibold text-slate-200 text-sm mb-1 block'
              htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Email'
              className='p-3 w-full rounded-lg bg-slate-600'
              {...register('email')}
            />
            {errors.email?.message && (
              <div className='text-sm mt-1 text-red-300'>
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className='mb-8'>
            <label
              className='font-semibold text-slate-200 text-sm mb-1'
              htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              className='p-3 w-full rounded-lg bg-slate-600'
              {...register('password')}
            />
            {errors.password?.message && (
              <div className='text-sm  mt-1 text-red-300'>
                {errors.password?.message}
              </div>
            )}
          </div>

          <button
            type='submit'
            className='p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 rounded font-bold'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
