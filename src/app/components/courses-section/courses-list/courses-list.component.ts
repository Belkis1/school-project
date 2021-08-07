import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { map } from "rxjs/operators"
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  files: Array<any> = []
  // get the subjects list from the services
  subjects = this.coursesService.subjects;
  //this is to help us style the selected subject button
  displayedSubject = undefined;
  //courses depends on the the selected subject, that's why we are using if
  courses: any;

  db = this.coursesService.db
  //when we want to show all courses
  allCourses: string = "all"
  constructor(private coursesService: CourseService, private fileService: UploadFileService,
    private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    })
    this.activatedRoute.params.subscribe((params) => {
      const subject = params['subject']
      this.displayedSubject = params['subject']
      if (subject === this.allCourses) {
        this.coursesService.getCourses().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
          .subscribe(rs => {
            this.courses = rs;

          })
      } else {
        const query = this.db.list('courses', ref => ref.orderByChild('Subject').equalTo(subject))
        query.snapshotChanges().pipe(map(changes => changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() as {} })))).subscribe(res => {
            this.courses = res;
          })
      }
    })

  }

  //redirect to courses in that subject
  selectSubject(s: any) {
    this.router.navigate(['courses', s.toLowerCase()])
  }

  // change the button (subject selected) styling
  changeStyling(s: any) {
    this.displayedSubject = s;
  }

}