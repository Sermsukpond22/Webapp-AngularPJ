import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoothsComponent } from './edit-booths.component';

describe('EditBoothsComponent', () => {
  let component: EditBoothsComponent;
  let fixture: ComponentFixture<EditBoothsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoothsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoothsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
