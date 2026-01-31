'use client';

import Link from "next/link";
import { useState } from 'react';

interface Task {
    title: string;
    description: string;
    estimated_hours: number;
    stakeholder: string;
}

interface Phase {
    name: string;
    tasks: Task[];
}

interface WBSProps {
    data: {
        project_name: string;
        phases: Phase[];
    };
}

export default function WBSPreview({ data }: WBSProps) {
    return (
        <div className="w-full apple-card p-6 md:p-8 bg-[var(--background)] border-2 border-[var(--primary)] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full mb-2 inline-block">
                        Free Preview
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{data.project_name}</h3>
                </div>
                <div className="bg-[var(--card-bg)] px-4 py-2 rounded-2xl text-center">
                    <div className="text-[10px] font-bold uppercase text-[var(--muted)]">Total Phases</div>
                    <div className="text-xl font-bold">{data.phases.length}</div>
                </div>
            </div>

            <div className="space-y-8">
                {data.phases.map((phase, idx) => (
                    <div key={idx} className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[var(--card-bg)] text-[var(--primary)] flex items-center justify-center text-xs">
                                {idx + 1}
                            </span>
                            {phase.name}
                        </h4>

                        <div className="grid grid-cols-1 gap-3 pl-8">
                            {phase.tasks.map((task, tIdx) => (
                                <div
                                    key={tIdx}
                                    className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-bold group-hover:text-[var(--primary)] transition-colors">
                                            {task.title}
                                        </h5>
                                        <span className="text-[10px] font-bold bg-white dark:bg-black px-2 py-1 rounded-full text-[var(--muted)]">
                                            {task.estimated_hours}h
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        {task.stakeholder}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-6 rounded-3xl bg-[var(--primary)] text-white text-center space-y-4 shadow-lg shadow-[var(--primary)]/20">
                <h4 className="text-lg font-bold">Want the full professional package?</h4>
                <p className="text-sm opacity-90 leading-relaxed px-4">
                    Unlock the 7-sheet Excel Tracker, 10 formatted PDFs, and Real Project Lessons Learned Reflection for just $2.99.
                </p>
                <Link
                    href="/payment"
                    className="apple-button inline-block text-lg px-10 py-4 shadow-xl mb-4 bg-white text-[var(--primary)] hover:bg-gray-50"
                >
                    Get Everything for $2.99
                </Link>
            </div>
        </div>
    );
}
