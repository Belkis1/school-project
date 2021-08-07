import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { FileUpload } from '../model/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  coursesPath = '/courses'
  coursesRef!: AngularFireList<Course>
  filesKeys: any
  fileURL!: any
  FilesRef: AngularFireList<FileUpload>
  basePath = '/Uploaded Courses';
  coursesFiles = '/Uploaded Files for Courses';

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.FilesRef = this.db.list(this.coursesFiles);
    this.coursesRef = this.db.list(this.coursesPath)
   }

   //Ps: some functions may have been created and not used, if you find one, feel free to delete it.

  pushFileToStorage(fileUpload: FileUpload): any {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.courseKey = "";
          this.filesKeys = this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  saveFileData(fileUpload: FileUpload): any {
    return this.FilesRef.push(fileUpload);
  }

  getFiles(): AngularFireList<FileUpload> {
    return this.FilesRef;
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.coursesFiles).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  UpdateTheFile(key: string, value: any): Promise<any> {
    return this.FilesRef.update(key, value);
  }

  getFilesWithCourseKey(courseKey: string) {
    return this.db.list(this.coursesFiles, ref => ref.orderByChild('courseKey').equalTo(courseKey));
  }

  AddFilesToCoursesNode(courseKey: string, file: FileUpload): any {
    const bo = this.db.list("/courses/" + courseKey + "/files/");
    return bo.push(file);
  }

  getCourseFiles(courseKey: string): AngularFireList<FileUpload> {
    return this.db.list("/courses/" + courseKey + "/files/");
  }
  getFilewithKey(fileKey: string) {
    return this.db.object("/Uploaded Files for Courses/" + fileKey);
  }

}
