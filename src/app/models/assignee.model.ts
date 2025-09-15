export interface AssigneesResponse {
  status: string;
  formId: number;
  assignees: Assignee[]
}

export interface Assignee {
  id: number;
  fullName: string;
  email: string;
  assignedAt: string;
  submitted: boolean;
}