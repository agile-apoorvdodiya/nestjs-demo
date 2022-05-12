import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Modal } from "bootstrap";
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  openModal = false;
  selectedControl: any = null;
  index: null | number = null;
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
          label: `control-${event.currentIndex}`,
          name: `control-${event.currentIndex}`,
          type: item.type,
          labelView: item.labelView,
          ...(item.type === 'radio' || item.type === 'checkbox'
            ? {
                controls: this.fb.array([
                  this.fb.group({
                    label: 'Radio 1',
                    value: '1',
                  }),
                ]),
              }
            : {}),
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
    this.openModal = false;
    console.log(data);
    if (data?.index >= 0) {
      (this.form.controls['form'] as FormArray)
        .at(data?.index)
        .setValue(data.form);
      (this.form as FormGroup).updateValueAndValidity();
      console.log(this.form.value);
    }
  }

  onEditControl(index: number) {
    this.index = index;
    this.selectedControl = (this.form.controls['form'] as FormArray).at(index);
    this.openModal = true;
  }

  getControl(index: number) {
    return (this.form.controls['form'] as FormArray).at(index) as FormGroup;
  }

  getControlArray(index: number) {
    return (
      ((this.form.controls['form'] as FormArray).at(index) as FormGroup)
        .controls['controls'] as FormArray
    ).controls as FormGroup[];
  }
}
