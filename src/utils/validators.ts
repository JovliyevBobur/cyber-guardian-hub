/**
 * Validation utility functions
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Parol juda uzun' };
  }
  return { valid: true };
};

export const validateName = (name: string): { valid: boolean; message?: string } => {
  if (name.trim().length < 2) {
    return { valid: false, message: 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak' };
  }
  if (name.trim().length > 100) {
    return { valid: false, message: 'Ism juda uzun' };
  }
  return { valid: true };
};

