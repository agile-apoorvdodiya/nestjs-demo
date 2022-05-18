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

  async updateUserById(data: any) {
    try {
      return await this.userModel.findOneAndUpdate(
        {
          _id: data?.id,
        },
        data,
        { new: true },
      );
    } catch (err) {
      throw new HttpException(
        {
          message:
            err?.code === 11000
              ? 'User already exists with same email'
              : 'Internal server error',
          error: err,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  deleteUserById(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    });
  }

  async createUser(userData: any) {
    try {
      const newUser = await this.userModel.create([userData]);
      return newUser;
    } catch (err) {
      throw new HttpException(
        {
          message:
            err?.code === 11000
              ? 'User already exists with same email'
              : 'Internal server error',
          error: err,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
            _id: user._id,
            email: user.email,
            admin: user.admin,
            name: user.name,
          }),
          _id: user._id,
          email: user.email,
          admin: user.admin,
          name: user.name,
        }
      : null;
  }
}
