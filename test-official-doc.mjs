// Official Documentation Test for Kimi API
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

const client = new OpenAI({
    apiKey: process.env.KIMI_API_KEY,
    baseURL: "https://api.moonshot.ai/v1",
});

async function main() {
    console.log('🚀 Running Kimi API Test (Official Snippet)...');
    try {
        const completion = await client.chat.completions.create({
            model: "kimi-k2-turbo-preview",
            messages: [
                { "role": "system", "content": "You are Kimi, an AI assistant provided by Moonshot AI. You are proficient in Chinese and English conversations. You provide users with safe, helpful, and accurate answers. You will reject any questions involving terrorism, racism, or explicit content. Moonshot AI is a proper noun and should not be translated." },
                { "role": "user", "content": "Hello, my name is Li Lei. What is 1+1?" }
            ],
            temperature: 0.6,
        });

        console.log('\n✅ Response received:');
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error('\n❌ Error:', error.status, error.message);
        if (error.status === 401) {
            console.log('\n💡 Tip: Your API key might be invalid or copied with hidden characters.');
            console.log('Current Key length:', process.env.KIMI_API_KEY?.length);
        }
    }
}

main();
