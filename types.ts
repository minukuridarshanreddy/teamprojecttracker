
export enum ProjectStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Done = 'Done'
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  createdAt: string;
}

export type NewProject = Omit<Project, 'id' | 'createdAt'>;
