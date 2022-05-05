import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, EditUserComponent],
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {}
