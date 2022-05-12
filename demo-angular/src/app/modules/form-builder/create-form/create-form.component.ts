import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    // this.updateForm();
    this.createForm();
  }
  form: any = null;
  controls = [
    {
      type: 'text',
      labelView: 'Text',
      label: '',
    },
    {
      type: 'password',
      labelView: 'Password',
      label: '',
    },
    {
      type: 'checkbox',
      labelView: 'Checkbox',
      label: '',
    },
    {
      type: 'radio',
      labelView: 'Radio',
      label: '',
    },
  ];
  selected = true
    ? []
    : [
        {
          type: 'text',
          labelView: 'Text',
          label: '',
        },
      ];

  arrange(event: CdkDragDrop<any[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
      const control = (this.form.controls['form'] as FormArray).at(
        event.previousIndex
      );
      (this.form.controls['form'] as FormArray).removeAt(event.previousIndex);
      (this.form.controls['form'] as FormArray).insert(
        event.currentIndex,
        control
      );
    }
  }

  move(event: CdkDragDrop<any[]>) {
    if (
      event.container !== event.previousContainer &&
      event.previousContainer.id !== 'selected-container'
    ) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const item = this.selected[event.currentIndex];

      (this.form.controls['form'] as FormArray).insert(
        event.currentIndex,
        this.fb.group({
          label: item.label,
          type: item.type,
          labelView: item.labelView,
        })
      );
    }
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      form: this.fb.array([]),
    });
  }

  handleModalEven(data: any) {
    console.log(data);
    

  }
}
