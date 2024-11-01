import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoothsComponent } from './manage-booths.component';

describe('ManageBoothsComponent', () => {
  let component: ManageBoothsComponent;
  let fixture: ComponentFixture<ManageBoothsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBoothsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoothsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
