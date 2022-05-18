import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-room-window',
  templateUrl: './room-window.component.html',
  styleUrls: ['./room-window.component.scss'],
})
export class RoomWindowComponent implements OnInit, AfterViewChecked {
  @Input('currentUser') currentUser: Partial<IUser> = {};
  @Input('room') room: any = {};
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  expanded = true;
  messages: any[] = [];
  textBox = '';
  @ViewChild('messageContainer') private messageContainer: ElementRef | null =
    null;

  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.room);
    this.subscribeToMessages();
  }

  toggleWindow() {
    this.expanded = !this.expanded;
  }

  closeWindow() {
    this.closeEvent.emit({ close: true, room: this.room });
  }

  subscribeToMessages() {
    this.socketService.getOlderRoomMessages(this.room._id).subscribe((res) => {
      this.messages = res as any[];
    });
    this.socketService.getRoomMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  onSend() {
    if (this.textBox?.trim()) {
      this.messages.push({
        message: this.textBox,
        sender: 'self',
      });
      this.socketService.sendMessageInRoom({
        room: this.room._id,
        message: this.textBox,
        sender: this.currentUser._id,
        name: this.currentUser.name,
      });
      this.textBox = '';
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      (this.messageContainer as ElementRef).nativeElement.scrollTop = (
        this.messageContainer as ElementRef
      ).nativeElement.scrollHeight;
    } catch (err) {}
  }
}
