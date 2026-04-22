import { UserService } from '../../../src/services/user.service';
import { User } from '../../../src/models/user.model';
import bcrypt from 'bcryptjs';

jest.mock('../../../src/models/user.model');
jest.mock('bcryptjs');

const mockUser = {
  id: 1,
  name: 'Juan',
  email: 'juan@test.com',
  passwordHash: 'hashed_password',
};

describe('UserService - register', () => {
  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService();
  });

  it('should register a user successfully', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

    const result = await service.register({ name: 'Juan', email: 'juan@test.com', password: 'secret123' });

    expect(result).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('secret123', 10);
  });

  it('should throw error if email is invalid', async () => {
    await expect(service.register({ name: 'Juan', email: 'invalid', password: 'secret123' }))
      .rejects.toThrow('Invalid email');
  });

  it('should throw error if password is too short', async () => {
    await expect(service.register({ name: 'Juan', email: 'juan@test.com', password: '123' }))
      .rejects.toThrow('Password must be at least 6 characters');
  });

  it('should throw error if email already registered', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await expect(service.register({ name: 'Juan', email: 'juan@test.com', password: 'secret123' }))
      .rejects.toThrow('Email already registered');
  });
});

describe('UserService - validatePassword', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should return true for correct password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await service.validatePassword(mockUser as any, 'secret123');
    expect(result).toBe(true);
  });

  it('should return false for wrong password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    const result = await service.validatePassword(mockUser as any, 'wrong');
    expect(result).toBe(false);
  });
});
