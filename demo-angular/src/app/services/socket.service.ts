import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IUser, UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private userService: UserService) {}

  setStatus() {
    this.socket.connect();
    const userDetails: Partial<IUser> = this.userService.getUserDetails();
    this.socket.emit('setStatus', {
      id: userDetails._id,
      name: userDetails.name,
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  getOnlineUsers(): any {
    return this.socket.fromEvent('userList');
  }
}
