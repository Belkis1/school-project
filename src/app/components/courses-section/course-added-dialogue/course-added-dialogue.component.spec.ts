import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddedDialogueComponent } from './course-added-dialogue.component';

describe('CourseAddedDialogueComponent', () => {
  let component: CourseAddedDialogueComponent;
  let fixture: ComponentFixture<CourseAddedDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAddedDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddedDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
