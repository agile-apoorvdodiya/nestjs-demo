import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

const routes: Routes = [
  {
    path: '',
    component: FormBuilderComponent,
  },
  {
    path: 'create',
    component: CreateFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormBuilderRoutingModule {}
