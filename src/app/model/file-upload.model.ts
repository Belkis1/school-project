export class FileUpload {
    "key": string;
    "name": string;
    "url": string;
    "file": File;
    "courseKey": string;
    "added": boolean = false

    constructor(file: File) {
        this.file = file;
    }
}