import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignees } from './view-assignees';

describe('ViewAssignees', () => {
  let component: ViewAssignees;
  let fixture: ComponentFixture<ViewAssignees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssignees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
