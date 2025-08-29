import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contest/AuthProvider';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  // ✅ env se base URL
  const API_URL = import.meta.env.VITE_API_URL;

  // Toast function
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const onSubmit = async (data) => {
    const userinfo = {
      fullname: data.name,
      email: data.email,
      password: data.password,
      ...(isAdminSignup && { adminKey: data.adminKey })
    };
    
    try {
      const endpoint = isAdminSignup ? '/user/create-admin-key' : '/user/signup';
      // ✅ yahan env wali URL use hogi
      const response = await axios.post(`${API_URL}${endpoint}`, userinfo);

      console.log(response.data);
      showToast("Signup successful!", 'success');
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setAuthUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error("There was an error signing up!", error);
      showToast("Signup failed. " + (error.response?.data?.message || "Please try again."), 'error');
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transition-transform transform duration-300 ${
          toast.show ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {toast.message}
        </div>
      )}
      
      <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white w-[500px]">
        <h3 className="font-bold text-lg">Signup</h3>

        {/* Toggle for admin signup */}
        <div className="form-control">
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
          <div className="pt-4">
            <label>Full Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="pt-4">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="pt-4">
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              className="border outline-none rounded-md py-1 px-3 w-full mt-2"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Admin Key (only shown when admin signup is selected) */}
          {isAdminSignup && (
            <div className="pt-4">
              <label>Admin Secret Key</label>
              <br />
              <input
                type="password"
                placeholder="Admin Secret Key"
                className="border outline-none rounded-md py-1 px-3 w-full mt-2"
                {...register("adminKey", { required: "Admin key is required" })}
              />
              {errors.adminKey && (
                <p className="text-red-500 text-sm">{errors.adminKey.message}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-around items-center mt-4">
            <button
              type="submit"
              className="px-3 py-1 bg-pink-500 text-white mt-4 rounded-md hover:bg-pink-700"
            >
              Signup
            </button>
            <p>
              Already have an account?{" "}
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
  )
}

export default Signup;
