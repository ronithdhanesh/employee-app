import React from 'react';

export default function Hero() {
  const profileData = {
    name: "Ronith Dhanesh",
    role: "Aspiring Software Engineer",
    bio: "Passionate about building intelligent automation systems, scalable backend architectures, and high-performance user interfaces."
  };

  return (
    <section id="about" className="pt-32 pb-20 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-2 space-y-6">
          <span className="text-xs font-semibold tracking-widest text-blue-500 uppercase bg-blue-500/10 px-3 py-1 rounded-full">
            Available for Opportunities
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Hi, I'm <span className="text-blue-400">{profileData.name}</span>
          </h1>
          <p className="text-xl font-medium text-slate-400">{profileData.role}</p>
          <p className="text-slate-400 max-w-xl leading-relaxed">{profileData.bio}</p>
          <div className="pt-4">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors inline-block shadow-lg shadow-blue-600/20">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl border border-blue-500/20" />
        </div>
      </div>
    </section>
  );
}