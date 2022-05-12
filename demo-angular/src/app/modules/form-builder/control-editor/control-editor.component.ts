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
  @Input('data') data: any;
  formValue: any;
  @Input('index') index: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.data);
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
