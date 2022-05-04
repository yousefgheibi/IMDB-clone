import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFilmComponent } from './manage-film.component';

describe('ManageFilmComponent', () => {
  let component: ManageFilmComponent;
  let fixture: ComponentFixture<ManageFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
