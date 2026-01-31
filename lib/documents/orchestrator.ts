import { generateExcelTracker, ProjectData } from './excel';
import { generateProjectPDF, PDFData } from './pdf';
import { generateChatCompletion } from '@/lib/ai/kimi';

export interface DocumentBundle {
    name: string;
    files: {
        filename: string;
        content: Buffer;
        type: string;
    }[];
}

export async function generateFullBundle(projectData: any): Promise<DocumentBundle> {
    console.log('📦 Starting bundle generation for:', projectData.name);

    // 1. Expand data using AI to get enough content for 10 docs
    const expandedData = await expandProjectData(projectData);

    const bundle: DocumentBundle = {
        name: projectData.name || 'Project Plan',
        files: [],
    };

    // 2. Generate Excel Tracker
    const excelBuffer = await generateExcelTracker({
        ...projectData,
        wbs: typeof projectData.preview === 'string' ? JSON.parse(extractJson(projectData.preview) || '{}') : projectData.wbs,
    });
    bundle.files.push({
        filename: `${sanitizeName(projectData.name)}_Tracker.xlsx`,
        content: excelBuffer,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // 3. Generate 10 Core PDFs
    const pdfTypes = [
        { title: 'Project Plan', key: 'project_plan' },
        { title: 'Project Charter', key: 'charter' },
        { title: 'Communication Plan', key: 'comm_plan' },
        { title: 'Stakeholder Analysis', key: 'stakeholders' },
        { title: 'Risk Assessment', key: 'risks' },
        { title: 'Quality Management Plan', key: 'quality' },
        { title: 'Change Management Plan', key: 'change' },
        { title: 'Budget Breakdown', key: 'budget' },
        { title: 'Project Scope Statement', key: 'scope' },
        { title: 'Implementation Roadmap', key: 'roadmap' },
    ];

    for (const pdf of pdfTypes) {
        const pdfData: PDFData = {
            title: pdf.title,
            sections: expandedData[pdf.key] || [
                { heading: 'Overview', content: expandedData.overview || 'General project details...' },
                { heading: 'Details', content: 'Detailed information for phase 2 expansion.' }
            ],
        };

        const buffer = await generateProjectPDF(pdfData);
        bundle.files.push({
            filename: `${pdf.title.replace(/\s+/g, '_')}.pdf`,
            content: buffer,
            type: 'application/pdf',
        });
    }

    // 4. Generate Bonus Lessons Learned
    const bonusData: PDFData = {
        title: 'Real Project Lessons Learned Reflection',
        sections: expandedData.lessons_learned || [
            { heading: 'Executive Insights', content: 'Based on your project type, here are key pitfalls to avoid...' }
        ],
    };
    const bonusBuffer = await generateProjectPDF(bonusData);
    bundle.files.push({
        filename: `Surprise_Bonus_Lessons_Learned.pdf`,
        content: bonusBuffer,
        type: 'application/pdf',
    });

    return bundle;
}

async function expandProjectData(data: any): Promise<any> {
    const prompt = `
    You are a Master Project Manager. Based on the following project intake and preview:
    PROJECT: ${data.name}
    PREVIEW DATA: ${typeof data.preview === 'string' ? data.preview : JSON.stringify(data.preview)}

    Expand this into a comprehensive Master Blueprint.
    I need structured content for:
    1. Project Plan (Core Strategy)
    2. Project Charter (Authority/Overview)
    3. Communication Plan (Who/How/When)
    4. Stakeholder Analysis (Key roles/expectations)
    5. Risk Assessment (Specific technical/biz risks)
    6. Quality Management (Success criteria)
    7. Change Management (Process)
    8. Budget Breakdown (Categorized)
    9. Scope Statement (Inclusions/Exclusions)
    10. Roadmap (Detailed milestones)
    11. Lessons Learned (Real-world pitfalls for this specific project)

    FORMAT: Return as a valid JSON object where each key corresponds to the document title (e.g., "project_plan") and contains a list of sections: [{ heading: "...", content: "..." }].
    `;

    try {
        const response = await generateChatCompletion([
            { role: 'system', content: 'You generate structured JSON PM document content.' },
            { role: 'user', content: prompt }
        ]);

        const jsonStr = extractJson(response);
        return JSON.parse(jsonStr || '{}');
    } catch (e) {
        console.error('AI Expansion failed:', e);
        return {}; // Fallback to empty
    }
}

function extractJson(str: string): string | null {
    const match = str.match(/\{[\s\S]*\}/);
    return match ? match[0] : null;
}

function sanitizeName(name: string): string {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}
