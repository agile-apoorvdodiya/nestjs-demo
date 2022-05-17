import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChatUser } from '../chat/chat.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  @Input('user') chatUser: Partial<IChatUser> = {};
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  expanded = false;
  messages: any[] = [];
  constructor() {}

  ngOnInit(): void {}

  toggleWindow() {
    this.expanded = !this.expanded;
  }

  closeWindow() {
    this.closeEvent.emit({ close: true, user: this.chatUser });
  }
}
