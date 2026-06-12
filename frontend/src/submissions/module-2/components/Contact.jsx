import React, { useState } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus('Success! Message simulated.');
    setEmail('');
    setMessage('');

    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
          <p className="text-slate-400 mt-2">Have an interesting project or role? Drop a message.</p>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4 bg-slate-950 p-8 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg py-2.5 transition-colors shadow-md"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center text-sm font-medium text-emerald-400 pt-2 animate-fade-in">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}