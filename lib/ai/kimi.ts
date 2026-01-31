// Kimi AI Provider using OpenAI-compatible API
import OpenAI from 'openai';

const kimi = new OpenAI({
    apiKey: process.env.KIMI_API_KEY,
    baseURL: process.env.KIMI_API_BASE_URL || 'https://api.moonshot.ai/v1',
});

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export async function generateChatCompletion(messages: ChatMessage[]) {
    try {
        const response = await kimi.chat.completions.create({
            model: 'kimi-k2-turbo-preview', // Official model from docs
            messages: [
                {
                    role: 'system',
                    content: 'You are Kimi, an AI assistant provided by Moonshot AI. Your goal is to "Humanize Project Management" and help users "Save Time and Increase Efficiency". You guide users through specialized PM logic and frameworks so they can be experts even with zero PM skills. You are proficient in Chinese and English conversations.'
                },
                ...messages
            ],
            temperature: 0.6,
        });

        return response.choices[0]?.message?.content || '';
    } catch (error: any) {
        console.error('❌ Kimi API Error:', error.status, error.message);
        if (error.status === 401) {
            throw new Error('Authentication failed: Please check your Moonshot API Key.');
        }
        throw error;
    }
}

// System prompts for different stages
export const SYSTEM_PROMPTS = {
    intake: `You are a humanized PM mentor conducting a project intake interview. 
Your goal is to save the user time by using built-in PM frameworks and expert logic. 
Make the user feel like an expert even if they have zero PM skills.

Ask questions ONE AT A TIME to understand the project.

Questions to ask in order:
1. Email (for delivery)
2. Project name
3. Project description (what's the main goal?)
4. Timeline estimate (weeks/months)
5. Team size (how many people)
6. Budget (optional - can skip)

Keep responses SHORT, professional, and mentor-like. After collecting all info, explicitly tell the user: "Excellent! I have everything I need. Your Expert Project Plan is ready for review."
(Note: The system will automatically detect this and show an interactive button.)`,

    wbs: `You are a specialized PM logic engine that humanizes project goals into professional benchmarks. 
Based on the project details, generate a detailed Work Breakdown Structure (WBS) using pro PM frameworks.
Output the response in strict JSON format with the following structure:
{
  "project_name": "Project Name",
  "phases": [
    {
      "name": "Phase Name",
      "tasks": [
        {
          "title": "Task Title",
          "description": "Brief description showing PM expertise",
          "estimated_hours": 10,
          "stakeholder": "Specific Role"
        }
      ]
    }
  ]
}
Output ONLY the JSON.`,

    timeline: `You are a senior Project Manager. Based on the WBS and project details, generate a high-level Project Timeline.
Output in strict JSON format:
{
  "milestones": [
    {
      "name": "Milestone Name",
      "week": 1,
      "description": "What is achieved"
    }
  ],
  "duration_weeks": 12
}
Output ONLY the JSON.`,

    stakeholders: `You are a senior Project Manager. Based on the project, identify key Stakeholders and their roles (RACI).
Output in strict JSON format:
{
  "stakeholders": [
    {
      "role": "Role Name",
      "description": "Responsibilities",
      "raci": "Responsible/Accountable/Consulted/Informed"
    }
  ]
}
Output ONLY the JSON.`,
};

export async function generateWBS(projectDetails: string) {
    try {
        const response = await generateChatCompletion([
            { role: 'system', content: SYSTEM_PROMPTS.wbs },
            { role: 'user', content: `Project Details: ${projectDetails}` }
        ]);

        const jsonStr = response.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('❌ WBS Generation Error:', error);
        throw new Error('Failed to generate humanized WBS preview.');
    }
}

export async function generateTimeline(wbs: any) {
    try {
        const response = await generateChatCompletion([
            { role: 'system', content: SYSTEM_PROMPTS.timeline },
            { role: 'user', content: `WBS Data: ${JSON.stringify(wbs)}` }
        ]);

        const jsonStr = response.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('❌ Timeline Generation Error:', error);
        throw new Error('Failed to generate timeline preview.');
    }
}

export async function generateStakeholders(projectDetails: string) {
    try {
        const response = await generateChatCompletion([
            { role: 'system', content: SYSTEM_PROMPTS.stakeholders },
            { role: 'user', content: `Project Details: ${projectDetails}` }
        ]);

        const jsonStr = response.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('❌ Stakeholders Generation Error:', error);
        throw new Error('Failed to generate stakeholders preview.');
    }
}
