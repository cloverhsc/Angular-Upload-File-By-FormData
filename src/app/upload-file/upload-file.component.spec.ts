import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceService } from '../Service/service.service';

import { UploadFileComponent } from './upload-file.component';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;
  let mockService: jasmine.SpyObj<ServiceService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ServiceService', ['fileUpload', 'updateUploadStatus']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UploadFileComponent],
      providers: [{ provide: ServiceService, useValue: mockService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
