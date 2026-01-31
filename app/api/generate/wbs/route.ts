import { NextRequest, NextResponse } from 'next/server';
import { generateWBS, generateTimeline, generateStakeholders } from '@/lib/ai/kimi';

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // Extract project details from the conversation history
        const projectDetails = messages
            .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n');

        // Generate everything for a complete "expert" preview
        console.log('🏗️ Generating Full Preview Data...');
        const wbsData = await generateWBS(projectDetails);

        // Generate timeline and stakeholders in parallel for speed
        const [timelineData, stakeholderData] = await Promise.all([
            generateTimeline(wbsData),
            generateStakeholders(projectDetails)
        ]);

        return NextResponse.json({
            wbs: wbsData,
            timeline: timelineData,
            stakeholders: stakeholderData
        });
    } catch (error: any) {
        console.error('Preview API route error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate project preview' },
            { status: 500 }
        );
    }
}
