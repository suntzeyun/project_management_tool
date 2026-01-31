'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import WBSPreview from '@/components/WBSPreview';
import TimelinePreview from '@/components/TimelinePreview';
import StakeholderPreview from '@/components/StakeholderPreview';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    previewData?: {
        wbs: any;
        timeline: any;
        stakeholders: any;
    };
}

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi there! I'm your dedicated PM assistant. 👋\n\nTo get started on your professional project documents, what's your email address? (I'll send the final package here)",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
    const [isIntakeComplete, setIsIntakeComplete] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, isGeneratingPreview, isIntakeComplete]);

    const fetchFullPreview = async () => {
        setIsGeneratingPreview(true);
        try {
            const response = await fetch('/api/generate/wbs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messages }),
            });
            const data = await response.json();
            if (response.ok && data.wbs) {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: "I've humanized your project goals into this structured blueprint! Here is your free Project Preview! 🚀",
                        previewData: data
                    }
                ]);
                setIsIntakeComplete(false); // Reset so the button disappears
            }
        } catch (error) {
            console.error('Failed to generate preview:', error);
        } finally {
            setIsGeneratingPreview(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || isGeneratingPreview || isIntakeComplete) return;

        const userMessage = input.trim();
        setInput('');

        // Create new messages array with specific typing to avoid lint errors
        const newUserMessage: Message = { role: 'user', content: userMessage };
        const newMessages: Message[] = [...messages, newUserMessage];

        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: `Oops! Something went wrong: ${data.error || 'Connection error'}` },
                ]);
                return;
            }

            const assistantMessage: Message = { role: 'assistant', content: data.message };
            const updatedMessages: Message[] = [...newMessages, assistantMessage];
            setMessages(updatedMessages);

            if (data.isComplete) {
                setIsIntakeComplete(true);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)]">
            {/* Header */}
            <header className="glass border-b border-[var(--border)] px-6 py-4 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => router.push('/')}
                        className="text-xl font-bold tracking-tight hover:text-[var(--primary)] transition"
                    >
                        PM Chat
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Humanized AI Assistant</span>
                    </div>
                </div>
            </header>

            {/* Chat Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-10">
                <div className="max-w-3xl mx-auto space-y-10">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <div
                                className={`max-w-[95%] rounded-[24px] px-6 py-4 shadow-sm ${message.role === 'user'
                                    ? 'bg-[var(--primary)] text-white'
                                    : message.previewData
                                        ? 'bg-transparent shadow-none border-none p-0 w-full'
                                        : 'bg-[var(--card-bg)] text-[var(--foreground)]'
                                    }`}
                            >
                                {message.previewData ? (
                                    <div className="space-y-6">
                                        <p className="mb-4 text-sm font-medium ml-4">{message.content}</p>
                                        <WBSPreview data={message.previewData.wbs} />
                                        <TimelinePreview data={message.previewData.timeline} />
                                        <StakeholderPreview data={message.previewData.stakeholders} />

                                        {/* Final CTA after preview */}
                                        <div className="p-6 md:p-10 apple-card bg-[var(--card-bg)] border-2 border-[var(--primary)] shadow-2xl animate-in zoom-in-95 duration-500 text-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[var(--primary)]/20 rotate-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-10 h-10">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-3xl font-bold mb-4 tracking-tight">Complete Your Project Package</h3>
                                            <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed max-w-sm mx-auto">
                                                You've seen the preview. Now get the 12-file bundle (+ Bonuses) delivered instantly to your inbox.
                                            </p>
                                            <button
                                                className="apple-button text-xl px-12 py-5 w-full shadow-lg"
                                                onClick={() => {
                                                    // Save a small snapshot of project data for the checkout session
                                                    // In a larger app, this would be in a DB or proper state
                                                    const lastMessage = messages[messages.length - 1];
                                                    const projectInfo = {
                                                        name: messages.find(m => m.role === 'user')?.content.slice(0, 50) || 'My Project',
                                                        preview: lastMessage.content
                                                    };
                                                    localStorage.setItem('currentProject', JSON.stringify(projectInfo));
                                                    router.push('/payment');
                                                }}
                                            >
                                                Get My Full Package for $2.99
                                            </button>
                                            <p className="mt-4 text-xs text-[var(--muted)] uppercase tracking-widest">Instant Email Delivery</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                )}
                            </div>
                            <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] px-2">
                                {message.role === 'user' ? 'You' : 'Assistant'}
                            </span>
                        </div>
                    ))}

                    {isIntakeComplete && !isGeneratingPreview && !messages[messages.length - 1].previewData && (
                        <div className="flex flex-col items-center py-6 animate-in fade-in slide-in-from-bottom-4">
                            <button
                                onClick={fetchFullPreview}
                                className="apple-button text-lg px-12 py-5 shadow-xl bg-[var(--primary)] text-white hover:scale-105 transition-transform"
                            >
                                🚀 Click here to see your Work Breakdown & Project Plan
                            </button>
                        </div>
                    )}

                    {(isLoading || isGeneratingPreview) && (
                        <div className="flex flex-col items-start">
                            <div className="bg-[var(--card-bg)] text-[var(--foreground)] rounded-[24px] px-6 py-5 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    <span className="text-xs font-medium text-[var(--muted)] ml-2">
                                        {isGeneratingPreview ? 'Humanizing your plans into a blueprint...' : 'Thinking...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input */}
            <footer className="border-t border-[var(--border)] px-6 py-6 glass sticky bottom-0">
                <div className="max-w-3xl mx-auto">
                    {!isIntakeComplete ? (
                        <form onSubmit={handleSubmit} className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Your answer..."
                                disabled={isLoading || isGeneratingPreview}
                                className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-[20px] pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-[var(--muted)] disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || isGeneratingPreview || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all disabled:opacity-30 disabled:grayscale"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4 bg-[var(--card-bg)] rounded-[20px] border border-dashed border-[var(--border)]">
                            <p className="text-sm font-medium text-[var(--muted)]">Intake Complete — Preview Your Plan Above</p>
                        </div>
                    )}
                    <p className="mt-3 text-[10px] text-center text-[var(--muted)] uppercase tracking-[0.2em] font-medium">
                        Project Management humanized for you
                    </p>
                </div>
            </footer>
        </div>
    );
}
