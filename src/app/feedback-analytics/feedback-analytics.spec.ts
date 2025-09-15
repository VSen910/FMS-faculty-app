import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAnalytics } from './feedback-analytics';

describe('FeedbackAnalytics', () => {
  let component: FeedbackAnalytics;
  let fixture: ComponentFixture<FeedbackAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
