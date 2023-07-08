const mapping: Record<string, string> = {
  'employee-data': 'employee_data',
  'engagement-tools': 'engagement_tools',
  organizations: 'organization',
  'performance-evaluations': 'performance_evaluation',
  'time-trackings': 'time_tracking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
