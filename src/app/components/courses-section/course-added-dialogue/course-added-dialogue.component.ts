import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-added-dialogue',
  templateUrl: './course-added-dialogue.component.html',
  styleUrls: ['./course-added-dialogue.component.css']
})
export class CourseAddedDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CourseAddedDialogueComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
