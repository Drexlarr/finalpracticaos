import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Guardian} from "../models/guardian";
import {Urgency} from "../models/urgency";

const GUARDIAN = 'guardian'

@Injectable({ providedIn: 'root' })
export class GuardiansApiService {
  // Students Endpoint
  basePath = 'http://localhost:3000/api/guardians';
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
  // Create Student
  addGuardian(item: any): Observable<Guardian> {
    return this.http.post<Guardian>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student by Id
  getGuardianById(id: number): Observable<Guardian> {
    return this.http.get<Guardian>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student Data
  getAllGuardians(): Observable<Guardian[]>{
    return this.http.get<Guardian[]>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Student
  updateGuardian(id: number, item: Guardian): Observable<Guardian>{
    return this.http.put<Guardian>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteGuardian(id: number): Observable<any> {
    return this.http.delete<Guardian>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUrgenciesByGuardianId(id: number): Observable<Urgency>{
    return this.http.get<Urgency>(`${this.basePath}/${id}/urgencies`)
      .pipe(retry(2), catchError(this.handleError));
  }

}
