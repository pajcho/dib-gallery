import {Injectable} from '@angular/core';
import {Adapter} from './adapter';

export class Image {
  constructor(
    public id: number,
    public url: string,
    public title: string,
    public albumId: number,
    public thumbnailUrl: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class ImageAdapter implements Adapter<Image> {
  adapt(item: any): Image {
    return new Image(item.id, item.url, item.title, item.albumId, item.thumbnailUrl);
  }
}
