import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/Post';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServicesService } from 'src/app/services/post-services.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  
  public search: any = '';
  public query: any;
  public time = new Date()
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;

   //posts = this.postService.posts;
  //get the list of posts from the service
  posts: any

  //get the list of topics from the service
  topics = this.postService.topics;

  constructor(private postService: PostServicesService,
    activatedRoute: ActivatedRoute, private router: Router) {

    //to update the time (time ago)
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit(): void {

    //get the list of posts
    this.postService.getAllPosts().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        this.posts = rs;
      })

    //this is simply to get the topics, if not for the topics , we can remove it and we 
    //can still get the posts list.
    this.postService.getPostsList()

    //to filter the options in the search box
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value)
      )
    )
  }


  // Get the key 
  getKey(key: string) {
    this.router.navigate(['posts', key]);
  }

  /* display the topics in the search box */

  displayFn(subject: any) {
    return subject ? subject : undefined;
  }


  /* filter the topics based on your input */
  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.topics.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  //navigate to add post page
/*   clickAdd() {
    this.router.navigate(['create']);
  } */
}
