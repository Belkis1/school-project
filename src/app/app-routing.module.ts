import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-section/courses-list/courses-list.component';

const routes: Routes = [
  {path: "courses", children: [
    {path: ":subject", component: CoursesListComponent},
    {path: "all", component: CoursesListComponent},
    {path: "", redirectTo: "all", pathMatch: 'full'},
  ]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
