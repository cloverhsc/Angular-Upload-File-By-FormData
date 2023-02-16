import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceService } from 'src/app/Service/service.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ServiceService', ['fileUpload', 'updateUploadStatus']);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ServiceService, useValue: mockService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
