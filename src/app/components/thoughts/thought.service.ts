import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IThought } from './thought';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThoughtService {
  private readonly ITEMS_PER_PAGE = 6;
  private readonly API_URL = 'http://localhost:3000/thoughts';

  constructor(private http: HttpClient) {}

  list(page: number, query?: string, bookmarked: boolean = false): Observable<IThought[]> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', this.ITEMS_PER_PAGE);

    if (query && query.trim().length > 2) {
      params = params.set('q', query);
    }

    if(bookmarked){
      params = params.set('bookmarked', bookmarked)
    }

    return this.http.get<IThought[]>(this.API_URL, { params });
  }

  create(thought: IThought): Observable<IThought> {
    return this.http.post<IThought>(this.API_URL, thought);
  }

  changeBookmark(thought: IThought): Observable<IThought> {
    thought.bookmarked = !thought.bookmarked
    return this.edit(thought)
  }

  delete(id: number): Observable<IThought> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<IThought>(url);
  }

  getById(id: number): Observable<IThought> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<IThought>(url);
  }

  edit(thought: IThought): Observable<IThought> {
    const url = `${this.API_URL}/${thought.id}`;
    return this.http.put<IThought>(url, thought);
  }
}
