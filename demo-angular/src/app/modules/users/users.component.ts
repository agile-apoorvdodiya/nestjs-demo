import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  uploadURL = environment.uploadAPIUrl;
  constructor(private userService: UserService, private router: Router) {}
   

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        console.log(res);
        this.users = res?.users;
      },
      (err) => {}
    );
  }

  deleteHandler(id: string) {
    if (confirm('Are you sure?') && id) {
      this.userService.deleteUser(id).subscribe(
        (res: any) => {
          if (res?.success) {
            alert('User Deleted successfully');
            this.getAllUsers();
          }
        },
        (err) => {}
      );
    }
  }

  editUserHandler(id: string) {
    this.router.navigate(['/users', id]);
  }
  
  uploadUserHandler(id: string) {
    this.router.navigate(['/users/upload', id]);
  }
}
