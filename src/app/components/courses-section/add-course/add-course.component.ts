import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseAddedDialogueComponent } from '../course-added-dialogue/course-added-dialogue.component';
import { FileUpload } from 'src/app/model/file-upload.model';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course = new Course();
  addCourse!: FormGroup;
  submitted = true;
  add = false;
  subjects = this.courseServices.subjects;
  updatedFile: any;

  constructor(private courseServices: CourseService, public dialog: MatDialog,
    private uploadService: UploadFileService) {
    this.addCourse = new FormGroup({
      "courseTitle": new FormControl(null, [Validators.required]),
      "courseText": new FormControl(null),
      "courseSubject": new FormControl(null, [Validators.required])
    })
  }

  onSubmit(formDirective: any) {
    this.course.Title = this.addCourse.value.courseTitle;
    this.course.Text = this.addCourse.value.courseText;
    if (this.addCourse.value.courseSubject !== null) {
      this.course.Subject = this.addCourse.value.courseSubject.toLowerCase();
    }
    this.courseServices.createCourse(this.course).then((res: any) => {
      //we need the course key to add it to the uploaded file object in the firebase
      //so we actually can have a link between the course and its attached files. 
      this.newCourseKey = res.key;
      for (let file of this.FilesAttached) {
        this.uploadService.UpdateTheFile(file.key, { "courseKey": this.newCourseKey });
        this.uploadService.UpdateTheFile(file.key, { "added": true });
        //we are getting the updated file (by updated I mean the same file but with added
        // = true and courseKey = to the current added course key), because when we tried 
        // to add this same file hear without calling this method , it added the older
        // file (proprities not updated), that is why we created this service in the first place
        this.uploadService.getFilewithKey(file.key).valueChanges().subscribe(res => {
          this.updatedFile = res;     
          this.uploadService.AddFilesToCoursesNode(this.newCourseKey, this.updatedFile);

        });
      }
    })

    this.submitted = false;
    const dialogRef = this.dialog.open(CourseAddedDialogueComponent, {
      width: '50rem'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
    this.addCourse.reset();
    formDirective.resetForm();
  }

  ngOnInit(): void {
  }


  //upload file
  selectedFiles!: any;
  currentFileUpload!: FileUpload;
  percentage!: number;
  FilesAttached: any;
  newCourseKey: any;


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  FilesAttachedToCourse(event: any) {
    this.FilesAttached = event;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage: number) => {
        this.percentage = Math.round(percentage);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
