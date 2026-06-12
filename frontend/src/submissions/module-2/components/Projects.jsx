import React from 'react';

export default function Projects() {
  const projectList = [
    {
      title: "Asynchronous Contract Analyzer",
      description: "Built an AI-driven system using FastAPI and Redis to extract legal parameters and flag risks from complex legal agreements automatically.",
      tech: ["FastAPI", "Redis", "LangChain", "Python"]
    },
    {
      title: "Multimodal Document RAG Pipeline",
      description: "Engineered an advanced RAG pipeline optimized to parse, index, and retrieve insights simultaneously from tabular data, embedded charts, and raw text.",
      tech: ["React", "Python", "Vector DBs", "OpenCV"]
    },
    {
      title: "Real-Time Traffic Analytics",
      description: "Designed a computer vision system that monitors high-density traffic feeds, tracking individual vehicles with YOLOv8 and calculating congestion metrics.",
      tech: ["Python", "YOLOv8", "SORT Algorithm"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Engineering Projects</h2>
          <p className="text-slate-400 mt-2">Recent technical projects demonstrating system design and problem-solving.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectList.map((project, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
              <div>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}