import { Module } from '@nestjs/common';
import { SocketIoGateway } from 'src/socket/socket-io.gateway';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketService, SocketIoGateway],
})
export class SocketModule {}
