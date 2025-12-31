
import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectTable from './components/ProjectTable';
import { Project, NewProject } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load sample data or from local storage
  useEffect(() => {
    const saved = localStorage.getItem('team_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('team_projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (newProj: NewProject) => {
    const project: Project = {
      ...newProj,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };
    setProjects(prev => [project, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const stats = {
    total: projects.length,
    done: projects.filter(p => p.status === 'Done').length,
    inProgress: projects.filter(p => p.status === 'In Progress').length
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.owner.toLowerCase().includes(query) ||
      project.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-slate-900 shadow-xl py-10 mb-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Enterprise Solutions</div>
            <h1 className="elegant-title text-4xl md:text-5xl text-white drop-shadow-sm">Team Project Tracker</h1>
          </div>
          
          <div className="flex gap-4 md:gap-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Total</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-300">{stats.done}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Completed</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">{stats.inProgress}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Active</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8">
        <ProjectForm onAdd={handleAddProject} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Project Directory</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              />
            </div>
            <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
              {searchQuery 
                ? `Showing ${filteredProjects.length} of ${projects.length}`
                : `Showing ${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`
              }
            </div>
          </div>
        </div>

        <ProjectTable projects={filteredProjects} onDelete={handleDeleteProject} />
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 text-center text-slate-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-px bg-slate-200"></div>
          <span className="font-semibold text-slate-300 italic">Elegant Management Systems</span>
          <div className="w-8 h-px bg-slate-200"></div>
        </div>
        &copy; {new Date().getFullYear()} Modern Workforce Inc.
      </footer>
    </div>
  );
};

export default App;
