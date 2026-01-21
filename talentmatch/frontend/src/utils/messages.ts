export const LOGIN_MESSAGES = {
  WELCOME: 'Bem-vindo ao TalentMatch',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PASSWORD: 'Senha incorreta',
  INVALID_CREDENTIALS: 'Email ou senha incorretos',
  ERROR: 'Erro ao fazer login',
  SUCCESS: 'Login realizado com sucesso',
  LOADING: 'A fazer login...',
  REQUIRED_FIELDS: 'Email e senha são obrigatórios',
};

export const REGISTER_MESSAGES = {
  WELCOME: 'Criar nova conta',
  EMAIL_TAKEN: 'Este email já está registado',
  WEAK_PASSWORD: 'Senha fraca. Deve conter maiúsculas, minúsculas, números e caracteres especiais',
  PASSWORD_MISMATCH: 'As senhas não correspondem',
  ERROR: 'Erro ao registar',
  SUCCESS: 'Conta criada com sucesso',
  LOADING: 'A registar...',
  REQUIRED_FIELDS: 'Todos os campos são obrigatórios',
  NAME_TOO_SHORT: 'O nome deve ter no mínimo 2 caracteres',
  SELECT_ROLE: 'Seleccione um tipo de utilizador',
};

export const AUTH_MESSAGES = {
  LOGOUT: 'A fazer logout...',
  SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso proibido',
  LOADING: 'A carregar...',
};

export const DASHBOARD_MESSAGES = {
  WELCOME_CANDIDATE: 'Bem-vindo ao seu dashboard de candidato',
  WELCOME_COMPANY: 'Bem-vindo ao seu dashboard de empresa',
  NO_APPLICATIONS: 'Nenhuma candidatura ainda',
  NO_JOBS: 'Nenhum trabalho publicado',
  VIEW_JOBS: 'Ver trabalhos',
  POST_JOB: 'Publicar trabalho',
  MY_APPLICATIONS: 'Minhas candidaturas',
  MY_PROFILE: 'Meu perfil',
  LOGOUT: 'Fazer logout',
};

export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: 'Email inválido',
  EMAIL_REQUIRED: 'Email é obrigatório',
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  NAME_REQUIRED: 'Nome é obrigatório',
  CONFIRM_PASSWORD_REQUIRED: 'Confirmação de senha é obrigatória',
  PASSWORD_TOO_SHORT: 'Senha deve ter no mínimo 8 caracteres',
  PASSWORDS_DO_NOT_MATCH: 'As senhas não correspondem',
  INVALID_PHONE: 'Número de telefone inválido',
  INVALID_URL: 'URL inválida',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login realizado com sucesso',
  REGISTER: 'Conta criada com sucesso',
  LOGOUT: 'Logout realizado com sucesso',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso',
  PASSWORD_CHANGED: 'Senha alterada com sucesso',
  EMAIL_VERIFIED: 'Email verificado com sucesso',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet',
  SERVER_ERROR: 'Erro do servidor. Tente novamente mais tarde',
  UNKNOWN_ERROR: 'Um erro desconhecido ocorreu',
  INVALID_REQUEST: 'Pedido inválido',
  UNAUTHORIZED: 'Não autenticado',
  FORBIDDEN: 'Acesso proibido',
  NOT_FOUND: 'Recurso não encontrado',
  CONFLICT: 'Conflito: O recurso já existe',
};
