import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
/*
  private apiUrl = "https://api.themoviedb.org/3/movie/popular";
  private searchUrl = "https://api.themoviedb.org/3/search/movie";
  private apiKey = "21f05e908405701cea16ef2d76df0d47";
*/

private apiURL = 'https://api.themoviedb.org/3'
  private apiKey = '21f05e908405701cea16ef2d76df0d47'

  constructor(private http: HttpClient) {}


  getPopularMovies(page: number = 1): Observable<any> {
    const url = `${this.apiURL}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching popular movies:', error);
        return of({ results: [] });
      })
    );
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.apiURL}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error searching movies:', error);
        return of({ results: [] });
      })
    );
  }
  
}
