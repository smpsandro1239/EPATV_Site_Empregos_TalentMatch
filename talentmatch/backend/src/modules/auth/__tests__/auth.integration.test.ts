import { describe, it, expect, beforeEach } from '@jest/globals';

interface TestUser {
  email: string;
  password: string;
  name: string;
  role: 'CANDIDATE' | 'COMPANY';
}

describe('Authentication Integration Tests', () => {
  const baseUrl = 'http://localhost:3001';
  let testUser: TestUser;
  let accessToken: string;
  let refreshToken: string;

  beforeEach(() => {
    testUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'TestPass123!',
      name: 'Test User',
      role: 'CANDIDATE',
    };
  });

  it('deveria registar um novo utilizador', async () => {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('access_token');
    expect(data).toHaveProperty('refresh_token');
    expect(data.user.email).toBe(testUser.email);
  });

  it('deveria fazer login com credenciais corretas', async () => {
    // Primeiro registar
    await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    // Depois login
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('access_token');
    accessToken = data.access_token;
    refreshToken = data.refresh_token;
  });

  it('deveria retornar 401 para credenciais incorretas', async () => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'WrongPassword123!',
      }),
    });

    expect(response.status).toBe(401);
  });

  it('deveria obter utilizador autenticado', async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.email).toBe(testUser.email);
  });

  it('deveria renovar token com refresh token', async () => {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('access_token');
    expect(data).toHaveProperty('refresh_token');
  });

  it('deveria retornar 401 para token inválido', async () => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: { Authorization: 'Bearer invalid-token' },
    });

    expect(response.status).toBe(401);
  });

  it('deveria rejeitar email duplicado no registo', async () => {
    // Registar primeiro utilizador
    await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    // Tentar registar com mesmo email
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    expect(response.status).toBe(409);
  });
});
