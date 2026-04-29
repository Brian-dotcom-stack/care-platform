import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDetail } from './health-detail';

describe('HealthDetail', () => {
  let component: HealthDetail;
  let fixture: ComponentFixture<HealthDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
