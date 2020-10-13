import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Builder } from '../models/builder.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://us-central1-findbuilder-3e6ad.cloudfunctions.net/app/builders';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getBuilders(): Observable<Builder[]> {
    return this.http.get<Builder[]>(`${apiUrl}`)
      .pipe(
        tap(),
        catchError(this.handleError('getBuilders', []))
      );
  }
}
