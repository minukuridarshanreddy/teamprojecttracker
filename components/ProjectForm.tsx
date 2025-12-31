
import React, { useState } from 'react';
import { ProjectStatus, NewProject } from '../types';

interface ProjectFormProps {
  onAdd: (project: NewProject) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.NotStarted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;
    
    onAdd({ name, owner, status });
    setName('');
    setOwner('');
    setStatus(ProjectStatus.NotStarted);
  };

  const inputClasses = "w-full px-4 py-4 md:py-2.5 bg-white border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400 text-base md:text-sm shadow-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 md:mb-1.5";

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 gap-y-8">
        <div>
          <label className={labelClasses}>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Q4 Revenue Strategy"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>Owner</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g., Sarah Jenkins"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className={inputClasses}
          >
            <option value={ProjectStatus.NotStarted}>Not Started</option>
            <option value={ProjectStatus.InProgress}>In Progress</option>
            <option value={ProjectStatus.Done}>Done</option>
          </select>
        </div>
        <div className="md:col-span-3 flex justify-end mt-2">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 md:py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 active:scale-95 transform duration-150 text-base"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
