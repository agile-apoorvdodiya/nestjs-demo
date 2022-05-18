import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { IUser } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  @Input('creator') user: IUser | null = null;
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  roomName: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  onCloseHandled() {
    this.closeEvent.emit({
      close: true,
      save: false,
    });
  }

  onSave() {
    if (this.roomName) {
      this.socketService
        .createRoom({
          name: this.roomName,
          createdBy: this.user?._id,
        })
        .subscribe((res) => {
          console.log(res);
          this.closeEvent.emit({
            save: true,
            close: true,
          });
        });
    }
  }
}
