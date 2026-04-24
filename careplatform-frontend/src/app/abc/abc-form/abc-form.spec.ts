import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcForm } from './abc-form';

describe('AbcForm', () => {
  let component: AbcForm;
  let fixture: ComponentFixture<AbcForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AbcForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
