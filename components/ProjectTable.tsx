
import React from 'react';
import { Project } from '../types';
import Badge from './Badge';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Mobile Swipe Hint */}
      <div className="md:hidden bg-slate-50 border-b border-slate-100 px-4 py-2 flex items-center justify-end">
        <span className="text-xs font-medium text-slate-400 italic flex items-center animate-pulse">
          Swipe to see more <span className="ml-1 text-lg leading-none">&rarr;</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="whitespace-nowrap px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100">Project Name</th>
              <th className="whitespace-nowrap px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100">Owner</th>
              <th className="whitespace-nowrap px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-indigo-900 bg-indigo-50 border-l border-indigo-100">Status</th>
              <th className="whitespace-nowrap px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-indigo-900 bg-indigo-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p className="text-lg font-medium text-slate-500">No projects tracked yet</p>
                    <p className="text-sm">Add your first project using the form above.</p>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-5 bg-white group-hover:bg-slate-50/50 transition-colors">
                    <div className="font-semibold text-slate-900">{project.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Created {project.createdAt}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 bg-white group-hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold mr-3 border border-slate-200">
                        {project.owner.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{project.owner}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 bg-indigo-50/30 border-l border-indigo-50/50 group-hover:bg-indigo-50/50 transition-colors">
                    <Badge status={project.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-right bg-indigo-50/30 group-hover:bg-indigo-50/50 transition-colors">
                    <button
                      onClick={() => onDelete(project.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-100 hover:border-red-200 px-4 py-2 rounded-lg transition-all duration-200 uppercase tracking-wide"
                      title="Delete project"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
