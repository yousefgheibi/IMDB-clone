import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRateComponent } from './manage-rate.component';

describe('ManageRateComponent', () => {
  let component: ManageRateComponent;
  let fixture: ComponentFixture<ManageRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
