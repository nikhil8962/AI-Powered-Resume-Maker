import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTemplate } from './resume-template';

describe('ResumeTemplate', () => {
  let component: ResumeTemplate;
  let fixture: ComponentFixture<ResumeTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
