import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class ResumeService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8080";

  generateResume(description: string) {
    return this.http.post(this.baseUrl + "/api/v1/resume/generate", {
      userDescription: description
    });
  }

}
