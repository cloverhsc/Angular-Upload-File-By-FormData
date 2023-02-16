import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpEventType } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      })
    };
    return of(this.http.post<any>('http://localhost:3000/upload', formData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`Uploaded! ${percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
      }
    }));
  }
}
