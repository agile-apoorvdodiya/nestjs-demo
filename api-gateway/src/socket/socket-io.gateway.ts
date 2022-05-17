import {
  ConnectedSocket,
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { SocketService } from 'src/module/socket/socket.service';

@WebSocketGateway({ transports: ['websocket'] })
export class SocketIoGateway {
  constructor(private socketService: SocketService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('setStatus')
  setStatus(client: Socket, payload: any) {
    this.socketService.onlineUsers.push({
      socketId: client.id,
      id: payload.id,
      name: payload.name,
    });
    this.server.emit('userList', this.socketService.onlineUsers);
  }

  @SubscribeMessage('messageTo')
  sendTo(client: Socket, payload: any) {
    client.to(payload.to).emit('privateMessage', {
      from: client.id,
      message: payload.message,
    });
    this.socketService.addMessage({
      from: client.id,
      ...payload,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`, args);
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    const index = this.socketService.onlineUsers.findIndex(
      (user) => user.socketId === client.id,
    );
    if (index > -1) this.socketService.onlineUsers.splice(index, 1);
  }
}
