import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  @Output() FilesToAddWithCourse = new EventEmitter<any>()

  fileUploads: Array<any> = [];
  Files2: Array<any> = []
  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    
    const query: any = this.uploadService.db.list(this.uploadService.coursesFiles, ref => ref.orderByChild('added').equalTo(false))
    query.snapshotChanges().pipe(map((changes: any) => 
      changes.map((c: any) => ({key: c.payload.key, ...c.payload.val()}) ))).subscribe((rs: any) => {
        this.fileUploads = rs;
        this.FilesToAddWithCourse.emit(this.fileUploads);
      })   
}
}