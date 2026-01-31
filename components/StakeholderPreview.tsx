'use client';

interface Stakeholder {
    role: string;
    description: string;
    raci: string;
}

interface StakeholderProps {
    data: {
        stakeholders: Stakeholder[];
    };
}

export default function StakeholderPreview({ data }: StakeholderProps) {
    return (
        <div className="w-full apple-card p-6 md:p-8 bg-[var(--background)] border-2 border-[var(--primary)] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
            <div className="mb-8 pb-4 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full mb-2 inline-block">
                    Stakeholder Matrix
                </span>
                <h3 className="text-2xl font-bold tracking-tight">Roles & Responsibilities</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.stakeholders.map((person, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
                        <div className="space-y-1">
                            <h4 className="font-bold">{person.role}</h4>
                            <p className="text-sm text-[var(--muted)] leading-relaxed">{person.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase bg-[var(--primary)] text-white px-2 py-1 rounded-full">
                                {person.raci}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--background)] bg-[var(--card-bg)] flex items-center justify-center overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--muted)]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    {data.stakeholders.length} Core Roles Identified
                </p>
            </div>
        </div>
    );
}
