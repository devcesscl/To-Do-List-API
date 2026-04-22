import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  async register(dto: CreateUserDto): Promise<User> {
    if (!dto.email || !dto.email.includes('@')) throw new Error('Invalid email');
    if (!dto.password || dto.password.length < 6) throw new Error('Password must be at least 6 characters');
    const existing = await User.findOne({ where: { email: dto.email } });
    if (existing) throw new Error('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return User.create({ name: dto.name, email: dto.email, passwordHash });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}

export default UserService;
