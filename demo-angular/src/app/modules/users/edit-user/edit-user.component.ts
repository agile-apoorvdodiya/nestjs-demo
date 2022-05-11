import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userDetails: IUser = {};
  userForm: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createUserForm();

    activatedRoute.params.subscribe((params: any) => {
      params['id'] === 'create' ? '' : this.getUserDetails(params['id']);
    });
  }

  ngOnInit(): void {}

  createUserForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      name: ['', Validators.required],
      admin: [false],
    });
  }

  getUserDetails(id: string) {
    this.userId = id;
    this.userService.getUserById(this.userId).subscribe(
      (res: any) => {
        (this.userForm as FormGroup).patchValue(res.user);
      },
      (err) => {}
    );
  }

  saveHandler() {
    if (this.userForm.invalid) {
      return alert('Enter all the details');
    }
    (this.userId
      ? this.userService.updateUser(this.userId, this.userForm.value)
      : this.userService.createUser(this.userForm.value)
    ).subscribe(
      (res: any) => {
        alert(res?.message);
        history.back();
      },
      (err) => {}
    );
  }

  onCancel() {
    history.back();
  }
}
