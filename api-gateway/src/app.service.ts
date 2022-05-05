import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @Inject('UserModel') private userModel: Model<any>,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllUser() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
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
    const newUser = await this.userModel.create([userData]);
    return newUser;
  }

  async login(userData: any) {
    const user = await this.userModel
      .findOne({
        email: userData.email,
        password: userData.password,
      })
      .lean();
    return user
      ? {
          token: this.jwtService.sign({
            id: user._id,
            email: user.email,
            admin: user.admin,
          }),
        }
      : null;
  }
}
