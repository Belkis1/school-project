import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './components/courses-section/add-course/add-course.component';
import { CourseAddedDialogueComponent } from './components/courses-section/course-added-dialogue/course-added-dialogue.component';
import { CourseFilesComponent } from './components/courses-section/course-files/course-files.component';
import { CoursesListComponent } from './components/courses-section/courses-list/courses-list.component';
import { FileDetailsComponent } from './components/courses-section/file-details/file-details.component';
import { FilesListComponent } from './components/courses-section/files-list/files-list.component';
import { UploadFileComponent } from './components/courses-section/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    CourseAddedDialogueComponent,
    CourseFilesComponent,
    CoursesListComponent,
    FileDetailsComponent,
    FilesListComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
