export type ProjectStatus = 'Pending' | 'In Progress' | 'Done' | 'Cancelled' | 'Active' | 'Completed' | 'OnHold';

export type Milestone = {
  id?: string;
  label: string;
  amount: number;
  percentage?: number;
  status?: 'Pending' | 'Completed' | 'Released';
  processUrl?: string;
  previewUrl?: string;
  paidAt?: number;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  freelancerId: string;
  freelancerName: string;
  clientName: string;
  price: number;
  status: ProjectStatus;
  milestones: Milestone[];
  reviewUrl?: string;
  projectUrl?: string;
  paidAt?: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt' | 'status' | 'freelancerName' | 'clientName'>;
export type UpdateProjectInput = Partial<CreateProjectInput> & { status?: ProjectStatus; paidAt?: number };
