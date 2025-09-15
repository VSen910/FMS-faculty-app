import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersModal } from './answers-modal';

describe('AnswersModal', () => {
  let component: AnswersModal;
  let fixture: ComponentFixture<AnswersModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswersModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
