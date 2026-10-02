import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class ResumeService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://ai-powered-resume-maker.onrender.com";

  generateResume(description: string) {
    return this.http.post(this.baseUrl + "/api/v1/resume/generate", {
      userDescription: description
    });
  }

}
