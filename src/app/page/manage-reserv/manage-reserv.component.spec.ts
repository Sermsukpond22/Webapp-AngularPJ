import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservComponent } from './manage-reserv.component';

describe('ManageReservComponent', () => {
  let component: ManageReservComponent;
  let fixture: ComponentFixture<ManageReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageReservComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
