import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { IUploadTask } from '../Header/header/header.interface';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  UploadTasks: IUploadTask[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Upload the form data to the upload service API endpoint.
   * And push the upload task to the UploadTasks array.
   * @param url : Upload service API endpoint
   * @param formData : upload file form data
   * @param fileName : Upload file name.
   * @param origin :
   */
  fileUpload(url: string, formData: FormData, fileName: string, origin = ''): void {
    const uuid = faker.datatype.uuid();

    this.UploadTasks.unshift(
      {
        title: fileName,
        status: 'Uploading',
        uuid: uuid,
        timestamp: new Date().toString(),
        progress: `0%`,
        task: this.http.post<HttpResponse<Event>>(url, formData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
          let progress = 0;
          switch (event.type) {
            case HttpEventType.UploadProgress:
              progress = Math.round((event.loaded / event.total) * 100);
              this.updateUploadStatus({ progress, uuid });
              break
            case HttpEventType.Response:
              this.updateUploadStatus({ message: event.body, uuid });

          }
        },
          (error) => {
            console.log('error', error)
          }),
      }
    )
  }

  /**
   * Reference SCC header.service.ts
   * @param status : Upload status
   */
  updateUploadStatus(status) {
    const { progress, uuid, message } = status
    const uploadIndex = this.UploadTasks.findIndex((item) => item.uuid === uuid)
    if (progress) {
      this.UploadTasks[uploadIndex].progress = `${progress}%`
      this.UploadTasks[uploadIndex].status = 'Uploading'
    } else if (message) {
      this.UploadTasks[uploadIndex].status = message
      this.UploadTasks[uploadIndex].progress = 0
    }
    else {
      this.UploadTasks[uploadIndex].status = message?.result
    }
  }
}
