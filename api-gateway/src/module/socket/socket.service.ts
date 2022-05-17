import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SocketService {
  constructor(@Inject('MessageModel') private messageModel: Model<any>) {}
  public onlineUsers = [];

  async addMessage(message: any) {
    try {
      if (message?.sender && message?.receiver) {
        const res = await this.messageModel.create({
          sender: message.sender,
          receiver: message.receiver,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
