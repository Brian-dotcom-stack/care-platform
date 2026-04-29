import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthForm } from './health-form';

describe('HealthForm', () => {
  let component: HealthForm;
  let fixture: ComponentFixture<HealthForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
