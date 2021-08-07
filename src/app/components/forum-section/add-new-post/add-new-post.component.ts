import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/Post';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent implements OnInit {
  AddPost:FormGroup;
  post= new Post();
  submitted= false;
  date= new Date();
  pipe = new DatePipe('en-US')
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  topics = this.PostService.topics
  
  constructor( private PostService: PostServicesService) { 
    this.AddPost= new FormGroup({
      "PostHeadline": new FormControl(null,[Validators.required]),
      "PostText": new FormControl(null,[Validators.required]),
      "Author": new FormControl(null,[Validators.required]),
      "Topic": new FormControl(null,[Validators.required]),
      })

    }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value)
      )
    )
  }
  onSubmit(){
    this.submitted=true;
    this.post.PostHeadline = this.AddPost.value.PostHeadline;
    this.post.PostText = this.AddPost.value.PostText;
    this.post.Author = this.AddPost.value.Author;
    this.post.Topic = this.AddPost.value.Topic;
    this.post.Created = this.pipe.transform(Date(), 'yyyy-dd-MM HH:mm:ss');
    this.post.dateNow = Date.now();
    this.post.negativeTimestamp = - this.post.dateNow;
    this.post.numberOFComments = 0
    this.PostService.CreatePost(this.post);   
  }
  newPost(){
    this.submitted=false;
    this.AddPost.reset();
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
}