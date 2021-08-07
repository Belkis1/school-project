import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-section/courses-list/courses-list.component';
import { AddNewPostComponent } from './forum-section/add-new-post/add-new-post.component';
import { PostDetailsComponent } from './forum-section/post-details/post-details.component';
import { PostsListComponent } from './forum-section/posts-list/posts-list.component';

const routes: Routes = [
  {
    path: "courses", children: [
      { path: ":subject", component: CoursesListComponent },
      { path: "all", component: CoursesListComponent },
      { path: "", redirectTo: "all", pathMatch: 'full' },
    ]
  },
  {
    path: 'posts', children: [
      { path: ":key", component: PostDetailsComponent },
      { path: "", component: PostsListComponent },
    ]
  },
  { path: 'create', component: AddNewPostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
