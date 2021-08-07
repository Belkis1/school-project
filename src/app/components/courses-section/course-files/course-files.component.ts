import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-course-files',
  templateUrl: './course-files.component.html',
  styleUrls: ['./course-files.component.css']
})
export class CourseFilesComponent implements OnInit {
  @Input() files: any;
  @Input() course: any;
  courseFiles!: any


  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  
    console.log(this.course.key);
        
    this.uploadService.getCourseFiles(this.course.key).valueChanges().subscribe(res => {
      this.courseFiles = res;
    })
  
}
}