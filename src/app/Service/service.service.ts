import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<{ reason: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      })
    };
    return this.http.post<{ reason: string }>('http://localhost:3000/upload', formData);
  }
}
