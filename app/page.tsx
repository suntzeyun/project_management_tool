import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-[var(--border)] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">PM Chat</h1>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[var(--muted)]">
            <a href="#how-it-works" className="hover:text-[var(--foreground)] transition">How it works</a>
            <a href="#examples" className="hover:text-[var(--foreground)] transition">Examples</a>
            <a href="#pricing" className="hover:text-[var(--foreground)] transition">Value</a>
          </nav>
          <Link href="/chat" className="apple-button text-sm px-4 py-2">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-[var(--card-bg)] rounded-full text-[var(--primary)]">
            Humanizing Project Management
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            Plan anything. <br />
            <span className="text-[var(--muted)]">In minutes.</span>
          </h2>
          <p className="text-xl md:text-2xl text-[var(--muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert project docs for anyone. Built for time and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat" className="apple-button text-lg px-10 py-4 w-full sm:w-auto">
              Start Free Preview
            </Link>
            <p className="text-sm text-[var(--muted)]">
              No credit card required for preview
            </p>
          </div>
        </div>
      </section>

      {/* Why Us vs ChatGPT Section */}
      <section className="py-24 px-6 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--primary)]">Why PM Chat instead of ChatGPT?</h3>
            <p className="text-[var(--muted)] text-lg max-w-3xl mx-auto leading-relaxed">
              ChatGPT is powerful, but it's a blank canvas. We've humanized the process by building the expertise directly into the logic.
              <strong> You save time figuring out what to ask</strong>—the customized prompts and frameworks are already built-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="apple-card p-10 bg-[var(--card-bg)] shadow-sm group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4">No Prompt Engineering</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Stop wasting hours figuring out the perfect prompt. Our specialized logic is pre-built to extract exactly what's needed for professional PM standards.
              </p>
            </div>

            <div className="apple-card p-10 bg-[var(--card-bg)] shadow-sm group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4">Expert Frameworks</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                We use industry-standard PM frameworks so you don't have to. Our versatile logic makes you look like a pro even with zero experience.
              </p>
            </div>

            <div className="apple-card p-10 bg-[var(--card-bg)] shadow-sm group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-pink-400 to-rose-600 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a5.971 5.971 0 0 0-.94 3.197m12.001-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4">Human-Centered</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                We've humanized project management. It feels like talking to a mentor who understands your struggle and guides you to the finish line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Examples */}
      <section id="examples" className="py-24 px-6 bg-[var(--card-bg)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4 tracking-tight">What can you build?</h3>
          <p className="text-[var(--muted)] text-center mb-16 max-w-xl mx-auto">
            From professional enterprise deployments to personal weekend adventures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Use Cases */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--muted)] px-4 text-center md:text-left">Business & Work</h4>
              <div className="apple-card p-10 bg-[var(--background)] space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 3.11a14.98 14.98 0 0 0-6.16 12.12 14.98 14.98 0 0 0 9.63 9.77 7.43 7.43 0 0 0 2.49-10.63Z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Software Deployment</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Map out sprints, CI/CD pipelines, and resource allocation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group border-t border-[var(--border)] pt-8">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Company Retreats</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Coordinate logistics, budgets, and team-building schedules.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group border-t border-[var(--border)] pt-8">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.73-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Market Expansion</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Plan to reach new segments with integrated marketing strategies.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Use Cases */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--muted)] px-4 text-center md:text-left">Personal & Life</h4>
              <div className="apple-card p-10 bg-[var(--background)] space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 0 1 8.716 6.747M12 3a9.015 9.015 0 0 0-8.716 6.747" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Birthday Planning</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Manage guest lists, vendor bookings, and venue timelines.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group border-t border-[var(--border)] pt-8">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Holiday Trips</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Iterative iteneraries, travel insurance checklists, and budget tracking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group border-t border-[var(--border)] pt-8">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">Moving House</h5>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">Task boards for packing, utility transfers, and lease management.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition / Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="apple-card p-10 md:p-16 text-center shadow-2xl overflow-hidden relative border-2 border-[var(--primary)]">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-10 blur-3xl rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">The $499 Value Package</h3>

              <div className="max-w-md mx-auto mb-12 text-left space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">10 Professional PM PDFs</span>
                  <span className="font-bold">$250</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Excel Project Tracker (7 Sheets)</span>
                  <span className="font-bold">$100</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Real Project Lessons Learned Reflection</span>
                  <span className="font-bold">$99</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Stakeholder RACI Matrix</span>
                  <span className="font-bold">$50</span>
                </div>
                <div className="flex justify-between items-center py-4 text-xl font-bold">
                  <span>Total Real-World Value</span>
                  <span className="text-[var(--muted)] line-through">$499</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-6xl font-bold tracking-tighter">
                  $2.99
                </div>
                <p className="text-[var(--muted)] text-lg">One-time payment. Lifetime access to your project docs.</p>
                <Link href="/chat" className="apple-button text-xl px-12 py-5 shadow-xl">
                  Start Free Preview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tight">PM Chat</div>
          <p className="text-sm text-[var(--muted)] text-center md:text-left">
            © 2026 PM Chat. All rights reserved. <br />
            Built for small teams to save time and efficiency.
          </p>
          <div className="flex space-x-6 text-sm text-[var(--muted)] font-medium">
            <a href="#" className="hover:text-[var(--foreground)] transition">Privacy</a>
            <a href="#" className="hover:text-[var(--foreground)] transition">Terms</a>
            <a href="#" className="hover:text-[var(--foreground)] transition">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
