import { Component, Input, OnInit, Output } from '@angular/core';
import { IForm } from 'src/app/services/form-builder.service';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
})
export class ViewFormComponent implements OnInit {
  @Output('closeEvent') closeEvent = new EventEmitter();
  display = 'none';
  @Input('display') set setDisplay(value: boolean) {
    this.display = value === true ? 'block' : 'none';
  }
  @Input('data') data: IForm = {} as IForm;
  form: FormGroup | any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   title: this.data.title,
    //   form: this.fb.array(
    //     this.data.form?.map((control) => {
    //       return this.fb.group({
    //         label: control.label,
    //         name: control.name,
    //         type: control.type,
    //         labelView: control.labelView,
    //         ...(['radio', 'checkbox'].includes(control.type)
    //           ? {
    //               controls: this.fb.array(
    //                 control.controls.map((sControl) => {
    //                   return this.fb.group({
    //                     label: sControl.label,
    //                     value: sControl.value,
    //                   });
    //                 })
    //               ),
    //             }
    //           : {
    //               placeholder: control.placeholder,
    //             }),
    //       });
    //     })
    //   ),
    // });
    this.form = this.fb.group({
      title: this.data.title,
      form: this.fb.array(
        this.data.form.map((control) => {
          return this.fb.group({
            [control.name]: [''],
          });
        })
      ),
    });
  }

  onCloseHandled() {
    this.display = 'none';
    this.closeEvent.emit({
      close: true,
      save: false,
    });
  }

  onSubmit() {
    console.log(this.form?.value);
  }

  // getFormControl(index: number) {
  //   return (this.form.controls['form'] as FormArray).at(index) as FormControl;
  // }
}
