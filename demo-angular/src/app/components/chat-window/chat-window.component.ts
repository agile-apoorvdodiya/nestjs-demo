import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { IChatUser } from '../chat/chat.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  @Input('user') chatUser: Partial<IChatUser> = {};
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  expanded = true;
  messages: any[] = [];
  textBox = '';
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.subscribeMessage();
    this.subscribeMessage();
  }

  toggleWindow() {
    this.expanded = !this.expanded;
  }

  closeWindow() {
    this.closeEvent.emit({ close: true, user: this.chatUser });
  }

  onSend() {
    if (this.textBox?.trim()) {
      this.messages.push({
        message: this.textBox,
        from: 'self',
      });
      this.socketService.sendMessage({
        to: this.chatUser.socketId,
        message: this.textBox,
      });
      this.textBox = '';
    }
  }

  subscribeMessage() {
    this.socketService.getMessages().subscribe((message: any) => {
      if (message.from === this.chatUser.socketId) this.messages.push(message);
    });
  }
}
