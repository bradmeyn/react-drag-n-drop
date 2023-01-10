import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from '../api/axios';

const Register = () => {
  type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const schema = z.object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: 'First name must be 2 or more letters' }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: 'Last name must be 2 or more letters' }),
    email: z.string().trim().email({ message: 'Email is required' }).min(1),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be 8 or more characters' }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('/register', data);
    } catch (err) {}
  };

  return (
    <div className='bg-cover bg-no-repeat bg-top grow h-full'>
      <div className='mx-auto my-20 p-10 rounded-lg bg-slate-700 py-12 w-[700px] h-auto'>
        <h1 className='text-white font-extrabold text-3xl mb-8'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 grid grid-flow-col gap-4'>
            <div>
              <label
                className='font-semibold text-slate-200 text-sm mb-1 block'
                htmlFor='first-name'
              >
                First name
              </label>
              <input
                id='first-name'
                type='text'
                placeholder='First name'
                className='p-3 w-full rounded-lg bg-slate-600'
                {...register('firstName')}
              />
              {errors.firstName?.message && (
                <div className='text-sm  mt-1 text-red-300'>
                  {errors.firstName?.message}
                </div>
              )}
            </div>
            <div>
              <label
                className='font-semibold text-slate-200 text-sm mb-1 block'
                htmlFor='first-name'
              >
                Last name
              </label>
              <input
                id='last-name'
                type='test'
                placeholder='Last name'
                className='p-3 w-full rounded-lg bg-slate-600'
                {...register('lastName')}
              />
              {errors.lastName?.message && (
                <div className='text-sm  mt-1 text-red-300'>
                  {errors.lastName?.message}
                </div>
              )}
            </div>
          </div>
          <div className='mb-3'>
            <label
              className='font-semibold text-slate-200 text-sm mb-1 block'
              htmlFor='email'
            >
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
              htmlFor='password'
            >
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
            className='p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 rounded font-bold'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
