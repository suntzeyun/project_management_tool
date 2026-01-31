// Simple test script for Kimi API with hardcoded key
import OpenAI from 'openai';

console.log('🧪 Testing Kimi API Connection (Hardcoded Key)...\n');

const apiKey = 'sk-NY3OvSzMJFJgZAqbVFkQmjTRPIwqmBN9Hf8Ug1Oy4Qp5Lqxb';
const baseURL = 'https://api.moonshot.ai/v1';

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

        if (error.status === 401) {
            console.error('\n🔴 STILL 401. This means the key itself is rejected by Moonshot AI.');
            console.error('Please check your account at https://platform.moonshot.ai');
        }
    }
}

testKimiAPI();
