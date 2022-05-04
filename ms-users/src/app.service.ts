import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async getUserById(id: string) {
    console.log(2342345);

    const user = await this.userModel.findOne({
      _id: id,
    });

    return user;
  }

  updateUserById(data: any) {
    return this.userModel.findOneAndUpdate(
      {
        _id: data?.id,
      },
      data,
      { new: true },
    );
  }

  deleteUserById(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    });
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
