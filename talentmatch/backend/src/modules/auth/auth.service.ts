import { PrismaService } from '@database/prisma/prisma.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDto, RegisterDto } from './dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private _prisma: PrismaService,
    private _jwtService: JwtService,
    private _configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this._prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password using Argon2
    const passwordHash = await argon2.hash(dto.password);

    // Create user and profile
    const user = await this._prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role,
        candidateProfile: dto.role === 'CANDIDATE' ? {
          create: {
            name: dto.name,
            location: 'Not specified', // Valor padrão
          },
        } : undefined,
        companyProfile: dto.role === 'COMPANY' ? {
          create: {
            name: dto.name,
            location: 'Not specified', // Valor padrão
          },
        } : undefined,
      },
    });

    // Generate tokens
    const { access_token, refresh_token } = await this._generateTokens(user.id, user.email, user.role);

    // Update last login
    await this._prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this._prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const { access_token, refresh_token } = await this._generateTokens(user.id, user.email, user.role);

    // Update last login
    await this._prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refreshToken(token: string): Promise<{ access_token: string }> {
    try {
      const payload = this._jwtService.verify(token, {
        secret: this._configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this._prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const access_token = this._jwtService.sign(
        {
          email: user.email,
          sub: user.id,
          role: user.role,
        },
        {
          secret: this._configService.get('JWT_SECRET'),
          expiresIn: this._configService.get('JWT_EXPIRATION', '1h'),
        },
      );

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    return this._prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // Private helper methods
  private async _generateTokens(userId: string, email: string, role: string) {
    const access_token = this._jwtService.sign(
      {
        email,
        sub: userId,
        role,
      },
      {
        secret: this._configService.get('JWT_SECRET'),
        expiresIn: this._configService.get('JWT_EXPIRATION', '1h'),
      },
    );

    const refresh_token = this._jwtService.sign(
      {
        sub: userId,
      },
      {
        secret: this._configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this._configService.get('JWT_REFRESH_EXPIRATION', '7d'),
      },
    );

    return { access_token, refresh_token };
  }
}
