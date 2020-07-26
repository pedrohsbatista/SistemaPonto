import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExclusionDialogComponent } from './confirm-exclusion-dialog.component';

describe('ConfirmExclusionDialogComponent', () => {
  let component: ConfirmExclusionDialogComponent;
  let fixture: ComponentFixture<ConfirmExclusionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmExclusionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmExclusionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
