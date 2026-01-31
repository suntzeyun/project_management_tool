'use client';

interface Milestone {
    name: string;
    week: number;
    description: string;
}

interface TimelineProps {
    data: {
        milestones: Milestone[];
        duration_weeks: number;
    };
}

export default function TimelinePreview({ data }: TimelineProps) {
    return (
        <div className="w-full apple-card p-6 md:p-8 bg-[var(--background)] border-2 border-[var(--primary)] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full mb-2 inline-block">
                        Project Timeline
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">Delivery Roadmap</h3>
                </div>
                <div className="bg-[var(--card-bg)] px-4 py-2 rounded-2xl text-center">
                    <div className="text-[10px] font-bold uppercase text-[var(--muted)]">Est. Duration</div>
                    <div className="text-xl font-bold">{data.duration_weeks} Weeks</div>
                </div>
            </div>

            <div className="relative pl-8 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border)]">
                {data.milestones.map((milestone, idx) => (
                    <div key={idx} className="relative">
                        <div className="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full bg-[var(--background)] border-2 border-[var(--primary)] flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-[var(--primary)]">Week {milestone.week}</span>
                                <h4 className="text-lg font-bold">{milestone.name}</h4>
                            </div>
                            <p className="text-sm text-[var(--muted)] leading-relaxed">
                                {milestone.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-xs text-[var(--muted)] flex items-center gap-3">
                <span className="text-xl">💡</span>
                <p>This timeline is optimized for efficiency and minimal waste based on your project scope.</p>
            </div>
        </div>
    );
}
