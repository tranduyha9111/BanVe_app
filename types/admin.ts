export interface DashboardStats {
  totalUsers: number;
  totalContents: number;
  totalCollaborators: number;
  totalReviews: number;
  userGrowth: number;
  contentGrowth: number;
  collaboratorGrowth: number;
  reviewGrowth: number;
}

export interface ChartPoint {
  name: string;
  value: number;
}
