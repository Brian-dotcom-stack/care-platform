import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosteringList } from './rostering-list';

describe('RosteringList', () => {
  let component: RosteringList;
  let fixture: ComponentFixture<RosteringList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosteringList],
    }).compileComponents();

    fixture = TestBed.createComponent(RosteringList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
