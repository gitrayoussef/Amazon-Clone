import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscountsComponent } from './edit-discounts.component';

describe('EditDiscountsComponent', () => {
  let component: EditDiscountsComponent;
  let fixture: ComponentFixture<EditDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiscountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
