import { LOGIN_MESSAGES, REGISTER_MESSAGES } from './messages';

export function logError(context: string, error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[${context}] ${errorMessage}`);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'Um erro desconhecido ocorreu';
}

export function handleAuthError(error: unknown, context: 'login' | 'register'): string {
  const errorMessage = getErrorMessage(error);
  logError(`Auth-${context}`, error);

  if (errorMessage.includes('email')) {
    return context === 'login' ? LOGIN_MESSAGES.INVALID_EMAIL : REGISTER_MESSAGES.EMAIL_TAKEN;
  }

  if (errorMessage.includes('password')) {
    return context === 'login' ? LOGIN_MESSAGES.INVALID_PASSWORD : REGISTER_MESSAGES.WEAK_PASSWORD;
  }

  if (errorMessage.includes('network')) {
    return 'Erro de conexão. Verifique sua internet';
  }

  if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
    return LOGIN_MESSAGES.INVALID_CREDENTIALS;
  }

  if (errorMessage.includes('409') || errorMessage.includes('conflict')) {
    return REGISTER_MESSAGES.EMAIL_TAKEN;
  }

  return context === 'login' ? LOGIN_MESSAGES.ERROR : REGISTER_MESSAGES.ERROR;
}

export function formatErrorResponse(error: unknown): { statusCode: number; message: string } {
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as { statusCode?: number; message?: string };
    return {
      statusCode: errorObj.statusCode || 500,
      message: errorObj.message || getErrorMessage(error),
    };
  }

  return {
    statusCode: 500,
    message: getErrorMessage(error),
  };
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('network') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('offline')
    );
  }
  return false;
}

export function isAuthenticationError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('401') ||
      error.message.includes('unauthorized') ||
      error.message.includes('Unauthorized')
    );
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('400') || error.message.includes('validation');
  }
  return false;
}
