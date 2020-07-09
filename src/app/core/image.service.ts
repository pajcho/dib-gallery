import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Image, ImageAdapter} from './image.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class ImageService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient, private adapter: ImageAdapter) {
  }

  getByAlbum(albumId: number): Observable<Image[]> {
    const url = `${this.baseUrl}/${albumId}/photos`;
    return this.http.get(url).pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    );
  }
}
