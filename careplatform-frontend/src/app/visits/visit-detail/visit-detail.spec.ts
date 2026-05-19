import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistDetail } from './vist-detail';

describe('VistDetail', () => {
  let component: VistDetail;
  let fixture: ComponentFixture<VistDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(VistDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
