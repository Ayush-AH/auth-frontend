'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { fullname, email, phone, password } = formData;

    if (!fullname.trim()) return toast.error('Full name is required');
    if (!email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Invalid email format');
    if (!phone.trim()) return toast.error('Phone number is required');
    if (!/^\d{10}$/.test(phone)) return toast.error('Phone must be 10 digits');
    if (!password) return toast.error('Password is required');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful!');
        setFormData({ fullname: '', email: '', phone: '', password: '' });
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="9876543210"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
