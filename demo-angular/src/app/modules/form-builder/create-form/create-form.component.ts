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
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilderService,
  IForm,
} from 'src/app/services/form-builder.service';
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
  formId = '';
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private formBuilderService: FormBuilderService
  ) {
    activatedRoute.params.subscribe((params) => {
      this.formId = params['id'];
      if (this.formId) this.getFormData();
    });
  }
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

  onDeleteControl(index: number) {
    (this.form.controls.form as FormArray).removeAt(index);
    this.selected.splice(index, 1);
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
    if (this.form.invalid || this.form?.controls?.form?.controls?.length === 0) {
      (this.form as FormGroup).markAllAsTouched();
      return;
    }

    (this.formId
      ? this.formBuilderService.updateForm(this.form.value, this.formId)
      : this.formBuilderService.createForm(this.form.value)
    ).subscribe((res: any) => {
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

  getFormData() {
    this.formBuilderService.getForm(this.formId).subscribe(
      (res: any) => {
        console.log(res);

        this.createFormFromValue(res.form);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
        }).then((res) => {
          history.back();
        });
      }
    );
  }

  createFormFromValue(formData: IForm) {
    if (formData) {
      this.form = this.fb.group({
        title: [formData.title, Validators.required],
        form: this.fb.array(
          formData.form.map((value) => {
            return this.fb.group({
              label: value.label,
              labelView: value.labelView,
              name: value.name,
              type: value.type,
              ...(['checkbox', 'radio'].includes(value.type)
                ? {
                    controls: this.fb.array(
                      value.controls.map((control) =>
                        this.fb.group({
                          label: control.label,
                          value: control.value,
                        })
                      )
                    ),
                  }
                : {
                    placeholder: value.placeholder,
                  }),
            });
          }),
          Validators.minLength(1)
        ),
      });
      this.selected = formData.form;
    }
  }
}
