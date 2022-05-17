import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { SocketIoGateway } from 'src/socket/socket-io.gateway';
import { MessagesSchema } from './schema/messages';
import { SocketService } from './socket.service';

@Module({
  providers: [
    SocketService,
    SocketIoGateway,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'MessageModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('MessageModel', MessagesSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class SocketModule {}
