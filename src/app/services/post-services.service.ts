import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Post } from '../model/Post';
import { map } from 'rxjs/operators';
import { TitleCasePipe } from '@angular/common';
import { Comment } from '../model/Comment';


@Injectable({
  providedIn: 'root'
})
export class PostServicesService {
  postsPath = '/Posts'
  commentsPath = '/Comments'
  PostRef: AngularFireList<Post>
  CommentRef: AngularFireList<Comment>
  posts: any;
  topics: Array<string> = [];
  postKey: any
  comments: any
  constructor(public db: AngularFireDatabase) {
    this.PostRef = this.db.list(this.postsPath);
    this.CommentRef = this.db.list(this.commentsPath)
  }
  AddComment(comment: Comment) {
    this.CommentRef.push(comment)
  }

  //get a specific post by its key
  getPostByURL(key: any) {
    const ah = this.db.object("/Posts/" + key);
    return ah
  }

  //get all posts
  getAllPosts(): AngularFireList<Post> {
    return this.PostRef;
  }

  getPostsList() {
    this.getAllPosts().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
        this.posts = rs;
        this.posts.forEach((element: { Topic: string; }) => {
          const check = new RegExp(element.Topic.toLowerCase())
          if (JSON.stringify(this.topics).toLowerCase().search(check) === -1) {
            this.topics.unshift(new TitleCasePipe().transform(element.Topic))
          };
        })

      })
  }

  //add a new post
  CreatePost(post: Post): any {
    return this.PostRef.push(post)
  }

  //delete One Post
  Update(key: string, value: any): Promise<any> {
    return this.PostRef.update(key, value)
  }
  //delete all the news
  DeleteAll(): Promise<any> {
    return this.PostRef.remove()
  }

  deleteComment(commentKey: string) {
    return this.CommentRef.remove(commentKey);
  }

  //Update/edit comment
  UpdateComment(key: string, value: any) {
    return this.CommentRef.update(key, value);
  }
  //get comments 
  getComments(): AngularFireList<Comment> {
    return this.CommentRef;
  }
  
  getCommentsList() {
    this.getComments().snapshotChanges().pipe(map(changes => 
      changes.map(c => ({key: c.payload.key, ...c.payload.val()})))).subscribe(rs => {
        this.comments = rs;
        console.log(this.comments);
        
      })
  }
}

