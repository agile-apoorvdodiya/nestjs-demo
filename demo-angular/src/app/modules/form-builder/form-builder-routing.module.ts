import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';

const routes: Routes = [
  {
    path: '',
    component: FormBuilderComponent,
  },
  {
    path: 'create',
    component: CreateFormComponent,
  },
  {
    path: 'edit/:id',
    component: CreateFormComponent,
  },
  {
    path: 'submit/:id',
    component: SubmitFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormBuilderRoutingModule {}
