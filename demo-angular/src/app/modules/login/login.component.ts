import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return alert('Please enter correct user details');
    }
    let data = this.loginForm.value;
    this.userService.login(data).subscribe(
      (res: any) => {
        if (res?.success) {
          alert('Login success');
          this.router.navigateByUrl('/users');
        }
      },
      (err) => {
        alert(err.error.message + '\n Try again with correct user details');
      }
    );
  }

  ngOnInit(): void {}
}
