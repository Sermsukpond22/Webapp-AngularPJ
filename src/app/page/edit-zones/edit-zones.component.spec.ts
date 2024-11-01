import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZonesComponent } from './edit-zones.component';

describe('EditZonesComponent', () => {
  let component: EditZonesComponent;
  let fixture: ComponentFixture<EditZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditZonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
