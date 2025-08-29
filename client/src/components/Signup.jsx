import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contest/AuthProvider';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  // ✅ Base API URL from .env
  const API_URL = import.meta.env.VITE_API_URL; // https://book-store-app-e82w.onrender.com/api

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Form submission
  const onSubmit = async (data) => {
    const userinfo = {
      fullname: data.name,
      email: data.email,
      password: data.password,
      ...(isAdminSignup && { adminKey: data.adminKey }),
    };

    try {
      // ✅ Correct endpoints with plural /users
      const endpoint = isAdminSignup ? '/users/create-admin-key' : '/users/signup';
      const response = await axios.post(`${API_URL}${endpoint}`, userinfo);

      console.log(response.data);
      showToast('Signup successful!', 'success');

      // Save user info in localStorage and Auth context
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setAuthUser(response.data.user);

      navigate('/');
    } catch (error) {
      console.error('There was an error signing up!', error);
      showToast(
        'Signup failed. ' + (error.response?.data?.message || 'Please try again.'),
        'error'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } transition-transform transform duration-300`}
        >
          {toast.message}
        </div>
      )}

      <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white w-[500px]">
        <h3 className="font-bold text-lg mb-4">Signup</h3>

        {/* Admin toggle */}
        <div className="form-control mb-4">
          <label className="label cursor-pointer justify-start">
            <span className="label-text">Signup as Admin</span>
            <input
              type="checkbox"
              className="toggle toggle-primary ml-2"
              checked={isAdminSignup}
              onChange={(e) => setIsAdminSignup(e.target.checked)}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register('name', { required: 'Full name is required' })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Admin Key */}
          {isAdminSignup && (
            <div className="mb-4">
              <label>Admin Secret Key</label>
              <input
                type="password"
                placeholder="Admin Secret Key"
                className="border outline-none rounded-md py-1 px-3 w-full mt-2"
                {...register('adminKey', { required: 'Admin key is required' })}
              />
              {errors.adminKey && (
                <p className="text-red-500 text-sm">{errors.adminKey.message}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-700"
            >
              Signup
            </button>

            <p className="mt-3">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => document.getElementById('my_modal_3').showModal()}
                className="underline text-blue-500 cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
