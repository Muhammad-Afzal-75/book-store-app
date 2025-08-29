import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../contest/AuthProvider'

const Login = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // ✅ Env se API base URL lo
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Toast function
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const onSubmit = async (data) => {
    const userinfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${API_URL}/user/login`,   // ✅ env se URL
        userinfo
      );

      console.log(response.data);
      showToast('Login successful!', 'success');

      // ✅ context update
      setAuthUser(response.data.user);

      // ✅ localStorage update
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // ✅ modal close karo
      document.getElementById('my_modal_3').close();

      // ✅ ab navigate karo
      navigate('/');
    } catch (error) {
      console.error('There was an error logging in!', error);
      showToast('Login failed. ' + error.response?.data?.message, 'error');
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white transition-transform transform duration-300 ${
            toast.show ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {toast.message}
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {/* Close Button */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              document.getElementById('my_modal_3').close();
              navigate('/');
            }}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Login</h3>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="py-4">
              <label>Email</label>
              <br />
              <input
                type="email"
                placeholder="Email"
                className="border outline-none rounded-md py-1 px-3 w-full max-w-xs mt-2"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                className="border outline-none rounded-md py-1 px-3 w-full max-w-xs mt-2"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-around items-center mt-4">
              <button
                type="submit"
                className="px-3 py-1 bg-pink-500 text-white mt-4 rounded-md hover:bg-pink-700"
              >
                Login
              </button>

              <p>
                Not Registered?{' '}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => document.getElementById('my_modal_3').close()}
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
