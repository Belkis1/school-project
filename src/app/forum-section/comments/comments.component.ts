import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments!: any;

  actualNumberOfComments!: number
  newNumberOfComments!: number
  currentPostKey: any
  currentPost: any
  noComments: boolean = true
  commentKey: any;


  editComment!: FormGroup;
  selectedComment: null;
  selectedCommentValue: string = "";
  newComment: any


  //edit selected Comment
  constructor(private postService: PostServicesService, private activatedRoute: ActivatedRoute) {
    this.editComment = new FormGroup({
      editedCommentContent: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {

    //get the current key of the post from the url
    this.activatedRoute.params.subscribe((params) => {
      this.currentPostKey = params['key']
      //get the current post by the above key 
      this.postService.getPostByURL(this.currentPostKey).valueChanges().subscribe((rs) => {
        this.currentPost = rs
        if (this.currentPost.numberOFComments !== 0) {
          this.noComments = false
        }
      })
    })
  }

  //delete the comment
  deleteComment(commentKey: any) {
    this.postService.deleteComment(commentKey);
    this.actualNumberOfComments = this.currentPost.numberOFComments
    this.newNumberOfComments = (this.actualNumberOfComments) - 1
    this.postService.PostRef.update(this.currentPostKey, { numberOFComments: this.newNumberOfComments })
    if (this.newNumberOfComments == 0) {
      this.noComments = true
    }
  }

  //edit the comment = in other words show the input field for editing and get the comment 
  //key so we can pass it into the database when updating the comment on the saveEditedComment()
  editSelectedComment(commentContent: any, commentKey: any, comment: any) {
    this.selectedComment = comment;
    this.selectedCommentValue = commentContent;
    this.commentKey = commentKey;
  }

  //Save the edited comment and update it in the database
  saveEditedComment() {
    this.newComment = this.editComment.value.editedCommentContent;
    this.postService.UpdateComment(this.commentKey, { commentContent: this.newComment });
    this.selectedComment = null;
  }


}
