import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IThought } from './thought';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private readonly API_URL = "http://localhost:3000/thoughts"

  constructor(private http: HttpClient) { }

  list(): Observable<IThought[]> {
    return this.http.get<IThought[]>(this.API_URL)
  }

  create(thought: IThought): Observable<IThought> {
    return this.http.post<IThought>(this.API_URL, thought)
  }

  delete(id: number): Observable<IThought> {
    const url = `${this.API_URL}/${id}`
    return this.http.delete<IThought>(url)
  }

  getById(id: number): Observable<IThought> {
    const url = `${this.API_URL}/${id}`
    return this.http.get<IThought>(url)
  }

  edit(thought: IThought): Observable<IThought> {
    const url = `${this.API_URL}/${thought.id}`
    return this.http.put<IThought>(url, thought)
  }

}
