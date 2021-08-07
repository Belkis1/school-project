import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { FileUpload } from 'src/app/model/file-upload.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @Output() newfileUploaded = new EventEmitter<any>()
  selectedFiles!: any;
  currentFileUpload!: FileUpload;
  percentage!: number;

  constructor(private uploadService: UploadFileService) {
  
   }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage: number) => {        
         this.percentage = Math.round(percentage);
       },
      (error: any) => {
        console.log(error);
      }
    );
  }

}