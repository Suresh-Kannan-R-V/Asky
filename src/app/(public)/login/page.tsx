'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoIcon } from 'packages/icons';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            // ✅ Store in localStorage (for client usage)
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('user', JSON.stringify(data.user));

            // ✅ Store token in COOKIE (for middleware)
            document.cookie = `token=${data.token}; path=/; max-age=86400`;

            // ✅ Redirect after login
            router.replace('/');
        } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-[400px] bg-white">
            {/* Header */}
            <div className="mb-3 text-center">
                <div className="flex items-center justify-center gap-0">
                    <LogoIcon className="text-primary-600 size-10" />
                    <p className="font-kalam text-5xl text-primary-600 pt-3">sky</p>
                </div>
                <p className="text-gray-500 text-sm mt-0">
                    Welcome back! Please enter your details.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="text-sm font-semibold text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold text-gray-700">
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                        placeholder="••••••••"
                    />
                    <div className='flex justify-end mt-2'>
                        <button
                            type="button"
                            onClick={() => router.push('/forgot-password')}
                            className="text-xs font-bold text-primary-600 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary-600 py-3 text-white font-bold"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-bold text-primary-600 hover:underline">
                        Register?
                    </Link>
                </p>
            </div>
        </div>
    );
}
