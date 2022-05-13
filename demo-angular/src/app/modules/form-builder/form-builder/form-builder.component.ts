import { Component, OnInit } from '@angular/core';
import {
  FormBuilderService,
  IForm,
} from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  forms: IForm[] = [];
  selectedForm: any | IForm = null;
  viewForm = false;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    this.getAllForms();
  }

  getAllForms() {
    this.formBuilderService.getAllForms().subscribe((res: any) => {
      this.forms = res.forms || [];
    });
  }

  viewModal(index: number) {
    this.viewForm = true;
    this.selectedForm = this.forms[index];
  }

  closeHandler() {
    this.viewForm = false;
  }
}
