import { Component, Input, OnInit, Output } from '@angular/core';
import { IForm } from 'src/app/services/form-builder.service';
import { EventEmitter } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  onCloseHandled() {
    this.display = 'none';
    this.closeEvent.emit({
      close: true,
      save: false,
    });
  }
}
