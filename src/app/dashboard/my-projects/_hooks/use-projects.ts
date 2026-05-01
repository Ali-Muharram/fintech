import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/lib/services/projectService';
import { CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';
import { toast } from 'sonner';

export function useProjects(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectService.getAll(params),
  });
}
 
export function useFreelancerProjects(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ['freelancer-projects', params],
    queryFn: () => projectService.getFreelancerProjects(params),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectInput) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('تم إنشاء المشروع بنجاح');
    },
    onError: (error: Error) =>
      toast.error(error.message || 'فشل إنشاء المشروع'),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
      projectService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data._id] });
      toast.success('تم تحديث المشروع بنجاح');
    },
    onError: () => toast.error('فشل تحديث المشروع'),
  });
}

export function useCancelProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('تم إلغاء المشروع');
    },
    onError: () => toast.error('فشل إلغاء المشروع'),
  });
}
 
export function useFreelancerUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { projectUrl?: string; reviewUrl?: string; milestones?: any[] } }) =>
      projectService.freelancerUpdate(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['freelancer-projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data._id] });
      toast.success('تم تحديث الروابط بنجاح');
    },
    onError: (error: Error) => toast.error(error.message || 'فشل تحديث الروابط'),
  });
}
export function useRecentProjects() {
  return useQuery({
    queryKey: ['recent-projects'],
    queryFn: () => projectService.getRecentProjects(),
  });
}
