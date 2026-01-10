'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        // Set dummy cookies
        document.cookie = `token=dummy-auth-token; path=/`;
        document.cookie = `role=user; path=/`; // change to admin if needed

        router.replace('/ua');
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Login (Dummy)
            </button>
        </div>
    );
}
