import { TestBed } from '@angular/core/testing';

import { FormBuilderService } from './form-builder.service';

describe('FromBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
