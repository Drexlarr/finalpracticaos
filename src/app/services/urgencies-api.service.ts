import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Urgency} from "../models/urgency";

@Injectable({ providedIn: 'root' })
export class UrgenciesApiService {

  basePath = 'http://localhost:3000/api/urgencies';
  constructor(private http: HttpClient) { }
  // HTTP Default Options
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
// API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  addUrgency(item: any): Observable<Urgency> {
    return this.http.post<Urgency>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUrgencyById(id: number): Observable<Urgency> {
    return this.http.get<Urgency>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllUrgencies(): Observable<Urgency>{
    return this.http.get<Urgency>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUrgency(id: number, item: Urgency): Observable<Urgency>{
    return this.http.put<Urgency>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteUrgency(id: number): Observable<any> {
    return this.http.delete<Urgency>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }}
