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
    // this.socket.connect();
    const userDetails: Partial<IUser> = this.userService.getUserDetails();
    this.socket.emit('setStatus', {
      id: userDetails._id,
      name: userDetails.name,
    });
    // this.socket.fromEvent('privateMessage').subscribe((data: any) => {
    //   if (data?.from && data?.message) {
    //   }
    // });
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
    this.socket.once('privateMessage', (res: any) => {
      console.log(res);
    });
    return this.socket.fromEvent('privateMessage').pipe(tap(res => {
      // console.log(res);

    }));
  }
}
