import { NextRequest, NextResponse } from 'next/server';
import { generateChatCompletion, SYSTEM_PROMPTS, ChatMessage } from '@/lib/ai/kimi';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Add system prompt for intake flow
    const conversationMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPTS.intake },
      ...messages,
    ];

    const response = await generateChatCompletion(conversationMessages);

    // Simple heuristic: if the AI asks "want to see your free preview" or similar, 
    // mark it as intake complete.
    const isComplete = response.toLowerCase().includes('free preview') ||
      response.toLowerCase().includes('ready to generate') ||
      response.toLowerCase().includes('ready for review');

    return NextResponse.json({
      message: response,
      isComplete: isComplete
    });
  } catch (error: any) {
    console.error('API route error:', error);

    // Return user-friendly error message
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
