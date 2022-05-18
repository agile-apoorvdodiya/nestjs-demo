import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilderService,
  IForm,
} from 'src/app/services/form-builder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss'],
})
export class SubmitFormComponent implements OnInit {
  data: IForm = {} as IForm;
  form: FormGroup | any = null;
  formId: string = '';
  constructor(
    private fb: FormBuilder,
    private formBuilderService: FormBuilderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.formId = params['id'];

      this.getForm();
    });
  }

  getForm() {
    this.formBuilderService.getForm(this.formId).subscribe((res: any) => {
      this.data = res.form;
      this.createForm();
    });
  }

  onSubmit() {
    console.log(this.form?.value);
    this.formBuilderService
      .submitForm({
        id: this.formId,
        ...this.form.value,
      })
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          text: 'Form submitted successfully!',
        }).then((res) => {
          history.back();
        });
      });
  }

  createForm() {
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
    history.back();
  }
}
