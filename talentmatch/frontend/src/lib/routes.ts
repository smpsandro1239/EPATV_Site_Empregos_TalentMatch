export const FRONTEND_ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password/:token',
  },
  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    PROFILE: '/candidate/profile',
    PROFILE_EDIT: '/candidate/profile/edit',
    JOBS: '/candidate/jobs',
    JOBS_SEARCH: '/candidate/jobs/search',
    APPLICATIONS: '/candidate/applications',
    MESSAGES: '/candidate/messages',
    SETTINGS: '/candidate/settings',
  },
  COMPANY: {
    DASHBOARD: '/company/dashboard',
    PROFILE: '/company/profile',
    PROFILE_EDIT: '/company/profile/edit',
    JOBS: '/company/jobs',
    JOBS_CREATE: '/company/jobs/create',
    JOBS_EDIT: '/company/jobs/:id/edit',
    APPLICATIONS: '/company/applications',
    CANDIDATES: '/company/candidates',
    MESSAGES: '/company/messages',
    SETTINGS: '/company/settings',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COMPANIES: '/admin/companies',
    JOBS: '/admin/jobs',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
};

export const getRouteByRole = (role: string) => {
  switch (role) {
    case 'CANDIDATE':
      return FRONTEND_ROUTES.CANDIDATE.DASHBOARD;
    case 'COMPANY':
      return FRONTEND_ROUTES.COMPANY.DASHBOARD;
    case 'ADMIN':
      return FRONTEND_ROUTES.ADMIN.DASHBOARD;
    default:
      return FRONTEND_ROUTES.HOME;
  }
};
