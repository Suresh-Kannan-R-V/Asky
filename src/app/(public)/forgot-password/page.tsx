'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoIcon } from 'packages/icons';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const router = useRouter();

    // Flow Control
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Form Data
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const BASE_URL = 'http://localhost:8000/api/auth/forgot-password';

    // Step 1: Send OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${BASE_URL}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to send OTP');

            setMessage(data.msg);
            setStep(2);
        } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Invalid OTP');

            setMessage(data.msg);
            setStep(3);
        } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Change Password
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${BASE_URL}/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    otp,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to reset password');

            alert('Password changed successfully!');
            router.push('/login');
        } catch (err: Error | unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-[400px] bg-white mx-auto mt-10 p-6 shadow-sm rounded-xl">
            {/* Header */}
            <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-0">
                    <LogoIcon className="text-primary-600 size-10" />
                    <p className="font-kalam text-5xl text-primary-600 pt-3">sky</p>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                    {step === 1 && 'Forgot Password'}
                    {step === 2 && 'Verify OTP'}
                    {step === 3 && 'Set New Password'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    {step === 1 && "Enter your email to receive a reset code."}
                    {step === 2 && `We sent a code to ${email}`}
                    {step === 3 && "Create a strong new password."}
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
            )}

            {message && !error && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-700 text-xs font-medium">{message}</p>
                </div>
            )}

            {/* Step 1: Email Form */}
            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border px-4 py-3 mt-1"
                            placeholder="name@gmail.com"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-primary-600 py-3 text-white font-bold disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            )}

            {/* Step 2: OTP Form */}
            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">6-Digit Code</label>
                        <input
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded-xl border px-4 py-3 mt-1 text-center tracking-widest font-bold text-lg"
                            placeholder="000000"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-primary-600 py-3 text-white font-bold"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-xs text-gray-500 hover:underline"
                    >
                        Back to Email
                    </button>
                </form>
            )}

            {/* Step 3: Password Form */}
            {step === 3 && (
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">New Password</label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-xl border px-4 py-3 mt-1"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-xl border px-4 py-3 mt-1"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-primary-600 py-3 text-white font-bold"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            )}

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Remember your password?{' '}
                    <Link href="/login" className="font-bold text-primary-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}