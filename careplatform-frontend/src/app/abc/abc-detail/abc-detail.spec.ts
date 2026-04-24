import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcDetail } from './abc-detail';

describe('AbcDetail', () => {
  let component: AbcDetail;
  let fixture: ComponentFixture<AbcDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AbcDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
