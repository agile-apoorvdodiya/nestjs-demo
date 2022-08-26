import { Component, OnInit } from '@angular/core';
import { fadeRow } from 'src/animations/table';
import {
  FormBuilderService,
  IForm,
} from 'src/app/services/form-builder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  animations: [fadeRow]
})
export class FormBuilderComponent implements OnInit {
  forms: IForm[] = [];
  selectedForm: any | IForm = null;
  viewForm = false;
  hostname = location.hostname === 'localhost' ?
  `${location.protocol}/${location.host}` : 
  `${location.protocol}/${location.hostname}`;
  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    this.getAllForms();
  }

  getAllForms() {
    this.formBuilderService.getAllForms().subscribe((res: any) => {
      this.forms = res.data || [];
    });
  }

  viewModal(index: number) {
    this.viewForm = true;
    this.selectedForm = this.forms[index];
  }

  closeHandler() {
    this.viewForm = false;
  }

  onDelete(index: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this form?  ',
      text: 'This operation can not be revert',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((res: any) => {
      if (res?.isConfirmed) {
        this.formBuilderService
          .deleteForm(this.forms[index]._id)
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Form deleted successfully!',
            }).then((res) => {
              this.getAllForms();
            });
          });
      }
    });
  }
}
