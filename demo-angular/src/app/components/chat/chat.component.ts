import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { IUser, UserService } from 'src/app/services/user.service';

export interface IChatUser {
  id: string;
  name: string;
  socketId: string;
  show?: boolean;
  isWindowOpen: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  onlineUsers: IChatUser[] = [];
  drawerOpen = true;
  currentUserDetails: IUser = {};
  chatWindow: IChatUser[] = [];
  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUserDetails = this.userService.getUserDetails();

    this.socketService.getOnlineUsers().subscribe((res: any[]) => {
      console.log(res);
      this.onlineUsers = res;
    });
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  onUserClick(user: IChatUser) {
    if (user.isWindowOpen !== true) {
      this.chatWindow.push(user);
      user.isWindowOpen = true;
    }
  }

  handleClose(data: any) {
    if (data?.close && data?.user?.socketId) {
      const index = this.chatWindow.findIndex(
        (window) => window.socketId === data.user.socketId
      );
      if (index > -1) {
        this.chatWindow.splice(index, 1);
        const user = this.onlineUsers.find(
          (user) => user.socketId === data.user.socketId
        );
        if (user?.isWindowOpen) user.isWindowOpen = false;
      }
    }
  }
}
