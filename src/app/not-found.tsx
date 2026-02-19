'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 text-center">
            <h1 className="text-7xl font-bold text-orange-500">404</h1>

            <p className="mt-4 text-2xl font-semibold">
                Page Not Found
            </p>

            <p className="mt-2 text-gray-400 max-w-md">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <p className="mt-6 text-sm text-gray-500">
                Redirecting to homepage in <span className="text-orange-400">5 seconds</span>...
            </p>

            <button
                onClick={() => router.push("/")}
                className="mt-8 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition"
            >
                Go Home Now
            </button>
        </div>
    );
}
