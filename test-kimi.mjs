// Simple test script for Kimi API
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

console.log('🧪 Testing Kimi API Connection...\n');

// Check if API key is loaded
const apiKey = process.env.KIMI_API_KEY ? process.env.KIMI_API_KEY.trim() : '';
const baseURL = (process.env.KIMI_API_BASE_URL || 'https://api.moonshot.ai/v1').trim();

console.log('🔑 API Key loaded:', !!apiKey);
console.log('🔑 API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
console.log('🌐 Base URL:', baseURL);
console.log('');

const kimi = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
});

async function testKimiAPI() {
    try {
        console.log('📨 Sending test message to Kimi API (model: kimi-k2-turbo-preview)...\n');

        const response = await kimi.chat.completions.create({
            model: 'kimi-k2-turbo-preview',
            messages: [
                { role: 'system', content: 'You are Kimi, an AI assistant provided by Moonshot AI.' },
                { role: 'user', content: 'Say hello in one short sentence.' }
            ],
            temperature: 0.6,
        });

        console.log('✅ SUCCESS! Kimi API is working!\n');
        console.log('📬 Response:', response.choices[0]?.message?.content);
        console.log('\n✨ Your Kimi API key is valid and working correctly!');

    } catch (error) {
        console.error('❌ ERROR! Kimi API test failed\n');
        if (error.status) console.error('Status:', error.status);
        if (error.message) console.error('Message:', error.message);

        // Check if there's a body with more info
        if (error.response && error.response.data) {
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        }

        if (error.status === 401) {
            console.error('\n🔴 Authentication failed. Please check:');
            console.error('1. Your API key is correct in .env.local');
            console.error('2. The API key has the correct format');
            console.error('3. The API key is active on https://platform.moonshot.ai');
        }
    }
}

testKimiAPI();
