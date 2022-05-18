import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ControlEditorComponent } from './control-editor/control-editor.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';

@NgModule({
  declarations: [FormBuilderComponent, CreateFormComponent, ControlEditorComponent, ViewFormComponent, SubmitFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormBuilderRoutingModule,
    DragDropModule,
    FormsModule,
  ],
})
export class FormBuilderModule {}
