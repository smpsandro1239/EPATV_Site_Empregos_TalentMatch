import { validateEmail, validatePassword, validatePasswordMatch } from './validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('deveria validar email correto', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    it('deveria rejeitar email sem @', () => {
      expect(validateEmail('userexample.com')).toBe(false);
    });

    it('deveria rejeitar email sem domínio', () => {
      expect(validateEmail('user@')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('deveria validar senha forte', () => {
      const result = validatePassword('SecurePass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deveria rejeitar senha muito curta', () => {
      const result = validatePassword('Abc1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve ter no mínimo 8 caracteres');
    });

    it('deveria rejeitar senha sem maiúsculas', () => {
      const result = validatePassword('securepass123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
    });

    it('deveria rejeitar senha sem minúsculas', () => {
      const result = validatePassword('SECUREPASS123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra minúscula');
    });

    it('deveria rejeitar senha sem números', () => {
      const result = validatePassword('SecurePass!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos um número');
    });

    it('deveria rejeitar senha sem caracteres especiais', () => {
      const result = validatePassword('SecurePass123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos um caractere especial');
    });
  });

  describe('validatePasswordMatch', () => {
    it('deveria validar senhas iguais', () => {
      expect(validatePasswordMatch('SecurePass123!', 'SecurePass123!')).toBe(true);
    });

    it('deveria rejeitar senhas diferentes', () => {
      expect(validatePasswordMatch('SecurePass123!', 'DifferentPass123!')).toBe(false);
    });
  });
});
