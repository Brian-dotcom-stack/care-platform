import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcList } from './abc-list';

describe('AbcList', () => {
  let component: AbcList;
  let fixture: ComponentFixture<AbcList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcList],
    }).compileComponents();

    fixture = TestBed.createComponent(AbcList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
