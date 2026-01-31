'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [dots, setDots] = useState('');

    // Simple loading animation for the "generation" text
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen pt-32 pb-16 px-6 bg-[var(--background)]">
            <div className="max-w-3xl mx-auto text-center">
                {/* Animated Celebration Icon */}
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/20 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Payment Successful!</h1>
                <p className="text-xl text-[var(--muted)] mb-12 max-w-xl mx-auto leading-relaxed">
                    Thank you for your purchase. Our AI is now crafting your high-conversion project documentation.
                </p>

                {/* Status Card */}
                <div className="apple-card p-10 bg-[var(--card-bg)] border-2 border-[var(--primary)] text-left mb-12 shadow-xl">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Payment Verified</h4>
                                <p className="text-sm text-[var(--muted)]">Order ID: {sessionId?.slice(-8) || '••••••••'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Document Generation in Progress{dots}</h4>
                                <p className="text-sm text-[var(--muted)]">We are building 10 PDFs + your Excel tracker.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Ready for Delivery</h4>
                                <p className="text-sm text-[var(--muted)]">Check your inbox in 2-3 minutes. Don't forget to check Spam!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bonus Box */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-orange-500/20 text-center mb-12">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 bg-orange-600/10 px-2 py-1 rounded-full mb-4 inline-block">
                        Surprise Bonus Unlocked
                    </span>
                    <h3 className="text-2xl font-bold mb-2">🎁 Your Lessons Learned Report is Included!</h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                        As a special thank you, we've added a customized reflection report based on your specific project type.
                    </p>
                </div>

                <Link href="/" className="secondary-button px-10 py-4">
                    Return to Home
                </Link>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
