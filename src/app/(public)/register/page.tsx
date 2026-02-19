'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoIcon } from 'packages/icons';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        role: 'student', // default as per your JSON
        name: '',
        username: '',
        password: '',
        email: '',
        phone_number: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Registration failed');
            }

            // Success! Redirect to login
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-[600px] mx-auto bg-white p-4">
            {/* Header */}
            <div className="mb-3 text-center">
                <div className="flex items-center justify-center gap-0">
                    <LogoIcon className="text-primary-600 size-10" />
                    <p className="font-kalam text-5xl text-primary-600 pt-3">sky</p>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                    Create your account to get started.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="Name"
                        />
                    </div>

                    {/* Role (Select) */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {/* Username */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="Username"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="Email"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                            name="phone_number"
                            type="tel"
                            required
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="Phone Number"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary-600 py-3.5 text-white font-bold transition-all hover:bg-primary-700 active:scale-[0.98] disabled:opacity-70 mt-4"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-primary-600 hover:underline">
                        Login?
                    </Link>
                </p>
            </div>
        </div>
    );
}