export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  CANDIDATES: {
    LIST: '/candidates',
    GET: (id: string) => `/candidates/${id}`,
    CREATE: '/candidates',
    UPDATE: (id: string) => `/candidates/${id}`,
    DELETE: (id: string) => `/candidates/${id}`,
    PROFILE: '/candidates/profile/me',
    SEARCH: '/candidates/search',
  },
  COMPANIES: {
    LIST: '/companies',
    GET: (id: string) => `/companies/${id}`,
    CREATE: '/companies',
    UPDATE: (id: string) => `/companies/${id}`,
    DELETE: (id: string) => `/companies/${id}`,
    PROFILE: '/companies/profile/me',
  },
  JOBS: {
    LIST: '/jobs',
    GET: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
    SEARCH: '/jobs/search',
    BY_COMPANY: (companyId: string) => `/companies/${companyId}/jobs`,
  },
  APPLICATIONS: {
    LIST: '/applications',
    GET: (id: string) => `/applications/${id}`,
    CREATE: '/applications',
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
    BY_JOB: (jobId: string) => `/jobs/${jobId}/applications`,
    BY_CANDIDATE: (candidateId: string) => `/candidates/${candidateId}/applications`,
  },
  MESSAGES: {
    LIST: '/messages',
    GET: (id: string) => `/messages/${id}`,
    SEND: '/messages',
    CONVERSATION: (userId: string) => `/messages/conversations/${userId}`,
  },
  MATCHING: {
    MATCH: (candidateId: string) => `/matching/candidates/${candidateId}/matches`,
    SCORE: (candidateId: string, jobId: string) => `/matching/candidates/${candidateId}/jobs/${jobId}/score`,
  },
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  USER_ROLE: 'user_role',
  USER_EMAIL: 'user_email',
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE_REGEX: /^(\+|00)[0-9\s\-()]+$/,
  URL_REGEX: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

export const TIME_CONSTANTS = {
  MS_IN_SECOND: 1000,
  MS_IN_MINUTE: 60000,
  MS_IN_HOUR: 3600000,
  MS_IN_DAY: 86400000,
  TOKEN_EXPIRY_MINUTES: 15,
  REFRESH_TOKEN_EXPIRY_DAYS: 7,
};
