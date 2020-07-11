import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Album} from '../../core/album.model';
import {select, Store} from '@ngrx/store';
import {AppState, layoutDirection} from '../../reducers';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album: Album;
  layout$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.layout$ = this.store.pipe(select(layoutDirection));
  }

  ngOnInit(): void {
  }

}
