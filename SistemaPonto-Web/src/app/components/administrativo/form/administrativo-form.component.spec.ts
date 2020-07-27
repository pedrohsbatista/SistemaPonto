import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoFormComponent } from './administrativo-form.component';

describe('AdministrativoFormComponent', () => {
  let component: AdministrativoFormComponent;
  let fixture: ComponentFixture<AdministrativoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
