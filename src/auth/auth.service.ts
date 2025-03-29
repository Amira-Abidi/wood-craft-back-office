import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async validateUser(email: string, password: string): Promise<{ email: string; role: string } | null> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === password) {
      return { email: user.email, role: user.role };
    }
    return null;
  }
}
