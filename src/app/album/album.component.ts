import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SlideshowComponent} from '../dialog/slideshow/slideshow.component';
import {DeleteComponent} from '../dialog/delete/delete.component';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {combineLatest, Observable} from 'rxjs';
import {Album} from '../core/album.model';
import {Image} from '../core/image.model';
import {select, Store} from '@ngrx/store';
import {albumListLoading, AppState, selectAlbums} from '../reducers';
import {LoadAlbum} from '../actions/album.actions';
import {map} from 'rxjs/operators';
import {DeleteImage} from '../actions/image.actions';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  layout = 'columns';
  album: Album;
  private sub: any;
  id: number;
  query: string;
  album$: Observable<Album>;
  loading$: Observable<boolean>;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private albumService: AlbumService,
              private imageService: ImageService, private userService: UserService, private store: Store<AppState>) {

    this.album$ = combineLatest([this.route.params, this.store.pipe(select(selectAlbums))]).pipe(
      map(([{id}, albums]) => albums.find((album: Album) => album.id === +id)),
    );
    this.loading$ = this.store.pipe(select(albumListLoading));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.store.dispatch(new LoadAlbum({id: this.id}));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gridColumns(): void {
    this.layout = 'columns';
  }

  gridRows(): void {
    this.layout = 'rows';
  }

  delete(image): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      panelClass: 'dip-dialog-panel',
      data: {album: this.album, image}
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed === true) {
        this.store.dispatch(new DeleteImage({data: image}));
      }
    });
  }

  openSlideshow(images: Image[], image: Image): void {
    this.dialog.open(SlideshowComponent, {
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      panelClass: 'dip-dialog-panel',
      data: {images, image}
    });
  }
}
