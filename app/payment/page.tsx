'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initiateCheckout = async () => {
            try {
                // In a real app, we'd pull the project data from local storage or a state management store
                const projectDataStr = localStorage.getItem('currentProject');
                const projectData = projectDataStr ? JSON.parse(projectDataStr) : {};

                const response = await fetch('/api/payment/create-checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ projectData }),
                });

                const data = await response.json();

                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || 'Failed to create checkout session');
                }
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        initiateCheckout();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="apple-card p-10 max-w-md w-full border-2 border-red-500/20">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Payment Error</h1>
                    <p className="text-[var(--muted)] mb-8">{error}</p>
                    <button
                        onClick={() => router.push('/chat')}
                        className="apple-button w-full"
                    >
                        Back to Chat
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
                <h1 className="text-3xl font-bold mb-4 tracking-tight">Preparing Secure Checkout</h1>
                <p className="text-[var(--muted)] text-lg">Redirecting you to Stripe for safe $2.99 payment...</p>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
