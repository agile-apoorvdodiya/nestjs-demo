import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-editor',
  templateUrl: './control-editor.component.html',
  styleUrls: ['./control-editor.component.scss'],
})
export class ControlEditorComponent implements OnInit {
  @Output('closeEvent') closeEvent = new EventEmitter();
  display = 'none';
  @Input('display') set setDisplay(value: boolean) {
    this.display = value === true ? 'block' : 'none';
  }
  data: any;
  @Input('data') set setData(value: any) {
    this.data = this.fb.group({
      label: '',
      name: '',
      type: '',
      labelView: '',
      ...(['checkbox', 'radio'].includes(value?.type)
        ? { controls: this.fb.array([]) }
        : { placeholder: '' }),
    });
    this.data.patchValue(value);
    value.controls?.forEach((v: any) => {
      ((this.data as FormGroup).controls['controls'] as FormArray).push(
        this.fb.group(v)
      );
    });
  }
  formValue: any;
  @Input('index') index: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.data?.value;
  }

  onCloseHandled() {
    this.display = 'none';
    this.closeEvent.emit({
      close: true,
      save: false,
      data: { index: this.index },
    });
  }

  onSave() {
    this.display = 'none';
    this.closeEvent.emit({
      close: false,
      save: true,
      data: { index: this.index, form: this.data?.value || {} },
    });
  }

  getControlsArray() {
    return (this.data.controls['controls'] as FormArray)
      .controls as FormGroup[];
  }

  deleteControl(index: number) {
    (this.data.controls['controls'] as FormArray).removeAt(index);
  }

  addControl() {
    (this.data.controls['controls'] as FormArray).push(
      this.fb.group({
        label: '',
        value: '',
      })
    );
  }
}
