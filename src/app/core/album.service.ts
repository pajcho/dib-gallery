import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album, AlbumAdapter} from './album.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class AlbumService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient, private adapter: AlbumAdapter) {
  }

  list(): Observable<Album[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get(url).pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    );
  }

  get(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}/` + albumId;
    return this.http.get(url).pipe(
      // Adapt each item in the raw data array
      map((item) => this.adapter.adapt(item))
    );
  }
}
