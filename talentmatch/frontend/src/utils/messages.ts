export const LOGIN_MESSAGES = {
  WELCOME: 'Bem-vindo ao TalentMatch',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PASSWORD: 'Palavra-passe incorreta',
  INVALID_CREDENTIALS: 'Email ou palavra-passe incorretos',
  ERROR: 'Erro ao iniciar sessão',
  SUCCESS: 'Sessão iniciada com sucesso',
  LOADING: 'A iniciar sessão...',
  REQUIRED_FIELDS: 'Email e palavra-passe são obrigatórios',
};

export const REGISTER_MESSAGES = {
  WELCOME: 'Criar nova conta',
  EMAIL_TAKEN: 'Este email já está registado',
  WEAK_PASSWORD: 'Palavra-passe fraca. Deve conter maiúsculas, minúsculas, números e caracteres especiais',
  PASSWORD_MISMATCH: 'As palavras-passe não correspondem',
  ERROR: 'Erro ao registar',
  SUCCESS: 'Conta criada com sucesso',
  LOADING: 'A registar...',
  REQUIRED_FIELDS: 'Todos os campos são obrigatórios',
  NAME_TOO_SHORT: 'O nome deve ter no mínimo 2 caracteres',
  SELECT_ROLE: 'Selecione um tipo de utilizador',
};

export const AUTH_MESSAGES = {
  LOGOUT: 'A terminar sessão...',
  SESSION_EXPIRED: 'A sua sessão expirou. Inicie sessão novamente',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso proibido',
  LOADING: 'A carregar...',
};

export const DASHBOARD_MESSAGES = {
  WELCOME_CANDIDATE: 'Bem-vindo ao seu painel de candidato',
  WELCOME_COMPANY: 'Bem-vindo ao seu painel de empresa',
  NO_APPLICATIONS: 'Ainda não existem candidaturas',
  NO_JOBS: 'Nenhuma vaga publicada',
  VIEW_JOBS: 'Ver vagas',
  POST_JOB: 'Publicar vaga',
  MY_APPLICATIONS: 'As minhas candidaturas',
  MY_PROFILE: 'O meu perfil',
  LOGOUT: 'Terminar sessão',
};

export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: 'Email inválido',
  EMAIL_REQUIRED: 'Email é obrigatório',
  PASSWORD_REQUIRED: 'Palavra-passe é obrigatória',
  NAME_REQUIRED: 'Nome é obrigatório',
  CONFIRM_PASSWORD_REQUIRED: 'Confirmação de palavra-passe é obrigatória',
  PASSWORD_TOO_SHORT: 'A palavra-passe deve ter no mínimo 8 caracteres',
  PASSWORDS_DO_NOT_MATCH: 'As palavras-passe não correspondem',
  INVALID_PHONE: 'Número de telefone inválido',
  INVALID_URL: 'URL inválida',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Sessão iniciada com sucesso',
  REGISTER: 'Conta criada com sucesso',
  LOGOUT: 'Sessão terminada com sucesso',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso',
  PASSWORD_CHANGED: 'Palavra-passe alterada com sucesso',
  EMAIL_VERIFIED: 'Email verificado com sucesso',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de ligação. Verifique a sua internet',
  SERVER_ERROR: 'Erro do servidor. Tente novamente mais tarde',
  UNKNOWN_ERROR: 'Ocorreu um erro desconhecido',
  INVALID_REQUEST: 'Pedido inválido',
  UNAUTHORIZED: 'Não autenticado',
  FORBIDDEN: 'Acesso proibido',
  NOT_FOUND: 'Recurso não encontrado',
  CONFLICT: 'Conflito: O recurso já existe',
};
