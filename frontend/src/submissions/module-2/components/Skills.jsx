import React from 'react';

export default function Skills() {
  const technicalSkills = [
    { category: "Languages", items: ["Python", "JavaScript", "Java", "SQL"] },
    { category: "Frameworks & Libraries", items: ["React", "FastAPI", "Tailwind CSS"] },
    { category: "AI & Data Science", items: ["LangChain", "TensorFlow", "NumPy", "Pandas"] },
    { category: "Tools & DevOps", items: ["Git", "Linux (Ubuntu)", "Docker", "WSL"] }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Core Competencies</h2>
          <p className="text-slate-400 mt-2">Technical domains and tools I work with daily.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalSkills.map((skillGroup, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
              <h3 className="font-semibold text-blue-400 text-sm tracking-wide uppercase mb-4">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}