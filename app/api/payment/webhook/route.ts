import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as any;

            const userEmail = session.customer_details?.email;
            const projectName = session.metadata?.project_name;

            console.log(`💰 Payment succeeded for ${userEmail}: ${projectName}`);

            try {
                const { generateFullBundle } = await import('@/lib/documents/orchestrator');
                const { resend } = await import('@/lib/resend');

                // 1. Generate all 12 files
                const bundle = await generateFullBundle({
                    name: projectName,
                    email: userEmail,
                    preview: session.metadata?.preview
                });

                // 2. Prepare attachments for Resend
                const attachments = bundle.files.map(file => ({
                    filename: file.filename,
                    content: file.content
                }));

                // 3. Send Email
                await resend.emails.send({
                    from: 'PM Chat Assistant <delivered@resend.dev>', // Change to your verified domain later
                    to: userEmail,
                    subject: `Your Project Package is Ready: ${projectName} 🎉`,
                    text: `Hi! Your professional project management documents for "${projectName}" are ready. We've attached 10 PDFs, your Excel tracker, and a surprise bonus Lessons Learned report. Enjoy!`,
                    attachments: attachments
                });

                console.log(`📧 Email delivered to ${userEmail}`);
            } catch (err) {
                console.error('❌ Delivery failed:', err);
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
