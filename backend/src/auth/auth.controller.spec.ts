import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register with correct parameters', async () => {
      const credentials = { email: 'test@test.com', password: 'password' };
      mockAuthService.register.mockResolvedValueOnce({ access_token: 'token' });

      await controller.register(credentials);

      expect(authService.register).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
      );
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const credentials = { email: 'test@test.com', password: 'password' };
      mockAuthService.login.mockResolvedValueOnce({ access_token: 'token' });

      await controller.login(credentials);

      expect(authService.login).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
      );
    });
  });
}); 