import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: Model<User>;

  const mockUser = {
    id: 'someId',
    email: 'test@test.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user and return token', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword' as never);
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(mockUser as any);

      const result = await service.register('test@test.com', 'password');
      expect(result).toEqual({ access_token: 'test-token' });
    });
  });

  describe('login', () => {
    it('should return token when credentials are valid', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await service.login('test@test.com', 'password');
      expect(result).toEqual({ access_token: 'test-token' });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      await expect(service.login('test@test.com', 'password'))
        .rejects
        .toThrow(UnauthorizedException);
    });
    it('should throw UnauthorizedException when password is invalid', async () => {
      const mockUser = { _id: 'userId', email: 'test@test.com' };
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser as never);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      await expect(service.login('test@test.com', 'wrongpassword'))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });
}); 