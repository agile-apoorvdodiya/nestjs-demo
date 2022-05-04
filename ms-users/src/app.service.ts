import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@Inject('UserModel') private userModel: Model<any>) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllUser() {
    return this.userModel.find();
  }

  async createUser(userData: any) {
    const newUser = await this.userModel.create([
      {
        name: userData.name,
        contact: userData.contact,
        email: userData.email,
      },
    ]);
    return newUser;
  }
}
