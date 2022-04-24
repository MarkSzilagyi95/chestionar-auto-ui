import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from './environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    headers = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.headers = this.headers.append('Content-Type', 'application/json');
    }

    public loadRandomQuestion() {
        return this.http.get<any>(`${environment.api_url}/questions/random`, {headers:this.headers});
    }
    public getQuestionById(questionId:any) {
        return this.http.get<any>(`${environment.api_url}/questions/${questionId}`, {headers:this.headers});
    }

    public getAllQuestions() {
        return this.http.get<any>(`${environment.api_url}/questions`, {headers:this.headers});
    }

    public updateQuestion(questionId:any, body:any) {
        return this.http.patch<any>(`${environment.api_url}/questions/${questionId}`, body, {headers:this.headers});
    }

    public addQuestion(body:any) {
        return this.http.post<any>(`${environment.api_url}/questions`, body, {headers:this.headers});
    }
}