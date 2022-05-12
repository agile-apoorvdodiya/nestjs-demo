import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  onCloseHandled() {
    this.display = 'none';
    this.closeEvent.emit({
      close: true,
      data: {},
    });
  }
}
