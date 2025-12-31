
import React from 'react';
import { ProjectStatus } from '../types';

interface BadgeProps {
  status: ProjectStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case ProjectStatus.Done:
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case ProjectStatus.InProgress:
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case ProjectStatus.NotStarted:
        return 'bg-slate-50 text-slate-600 border-slate-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColors()}`}>
      {status}
    </span>
  );
};

export default Badge;
