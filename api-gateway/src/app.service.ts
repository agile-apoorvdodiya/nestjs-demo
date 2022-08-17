import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { httpErrors, response } from './common/errors';
import { UserRequestDto } from './dto/userDto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AppService {
  constructor(
    @Inject('UserModel') private userModel: Model<any>, // TODO fix this any
    private jwtService: JwtService,
  ) {}

  async getAllUser() {
    try {
      const result = await this.userModel.find();
      return response.list('Users list', result);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw httpErrors.notFound('User not found');
      return response.single('User details', user);
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(data: UserRequestDto) {
    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: data?.id },
        data,
        { new: true },
      );

      if (!result || result?.upsertedCount === 0) {
        throw httpErrors.notFound('User not found');
      }

      return response.single('User updated successfully');
    } catch (error) {
      if (error?.code === 11000) {
        throw httpErrors.badRequest('User already exists');
      }
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      const result = await this.userModel.deleteOne({
        _id: id,
      });
      if (result.deletedCount === 0) {
        throw httpErrors.notFound('User not found');
      }
      return response.single('User deleted successfully');
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData: UserRequestDto) {
    try {
      const newUser = await this.userModel.create([userData]);

      return response.single('User created Successfully', newUser);
    } catch (error) {
      if (error?.code === 11000) {
        throw httpErrors.badRequest('User already exists');
      }
      throw error;
    }
  }

  async login(userData: LoginDto) {
    const user = await this.userModel
      .findOne({
        email: userData.email,
        password: userData.password,
      })
      .lean();

    if (!user) {
      throw httpErrors.badRequest('Invalid credentials');
    }

    const data = user
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
    return response.single('User logged in successfully', data);
  }
}
