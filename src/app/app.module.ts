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

//firebase config
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import 'firebase/storage';

//other dependencies (material, forms...)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewPostComponent } from './forum-section/add-new-post/add-new-post.component';
import { CommentsComponent } from './forum-section/comments/comments.component';
import { PostDetailsComponent } from './forum-section/post-details/post-details.component';
import { PostsListComponent } from './forum-section/posts-list/posts-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    CourseAddedDialogueComponent,
    CourseFilesComponent,
    CoursesListComponent,
    FileDetailsComponent,
    FilesListComponent,
    UploadFileComponent,
    AddNewPostComponent,
    CommentsComponent,
    PostDetailsComponent,
    PostsListComponent,
    DateAgoPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
