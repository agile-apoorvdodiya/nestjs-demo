import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser, UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private userService: UserService) {}

  // called when connected once
  setStatus() {
    console.log('setting');
    
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

  sendMessage(payload: any) {
    this.socket.emit('messageTo', payload);
  }

  getMessages() {
    return this.socket.fromEvent('privateMessage');
  }

  getOlderMessages(to: string, from: string) {
    this.socket.emit('getMessages', {
      from,
      to,
    });
    return this.socket.fromEvent('messageHistory');
  }
}
