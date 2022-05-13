import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormBuilderService } from 'src/app/services/form-builder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  openModal = false;
  selectedControl: any = null;
  index: null | number = null;
  constructor(
    private fb: FormBuilder,
    private formBuilderService: FormBuilderService
  ) {}
  ngOnInit(): void {
    // this.updateForm();
    this.createForm();
  }
  form: any | FormGroup = null;
  controls = [
    {
      type: 'text',
      labelView: 'Text',
      label: '',
    },
    {
      type: 'number',
      labelView: 'Number',
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
  selected: any[] = true
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
          label: `control-${this.selected.length}`,
          name: `control-${this.selected.length}`,
          type: item.type,
          labelView: item.labelView,
          ...(item.type === 'radio' || item.type === 'checkbox'
            ? {
                controls: this.fb.array([
                  this.fb.group({
                    label: 'Control 1',
                    value: '1',
                  }),
                ]),
              }
            : {
                placeholder: '',
              }),
        })
      );
    }
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      form: this.fb.array([], Validators.minLength(1)),
    });
  }

  handleModalEven(data: any) {
    this.openModal = false;
    if (data?.data?.index >= 0 && data.save) {
      const controlAtIndex = (this.form.controls['form'] as FormArray).at(
        data?.data?.index
      );

      controlAtIndex.patchValue(data.data.form);
      if (data.data.form?.controls) {
        (
          (controlAtIndex as FormGroup).controls['controls'] as FormArray
        ).clear();
        data.data.form.controls.forEach((value: any) => {
          (
            (controlAtIndex as FormGroup).controls['controls'] as FormArray
          ).push(this.fb.group(value));
        });
      }
    }
  }

  onEditControl(index: number) {
    this.index = index;
    this.selectedControl = (this.form.controls['form'] as FormArray).at(
      index
    ).value;
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

  getFormControlError(control: string, error: string) {
    const formControl = this.form.controls[control] as FormControl;
    return (
      formControl.touched && formControl.errors && formControl.errors[error]
    );
  }

  onSave() {
    if (this.form.invalid) {
      (this.form as FormGroup).markAllAsTouched();
      return;
    }

    this.formBuilderService
      .createForm(this.form.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Form created successfully!',
          }).then((res) => {
            history.back();
          });
        }
      });
  }
}
