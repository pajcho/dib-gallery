import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SlideshowComponent} from '../dialog/slideshow/slideshow.component';
import {DeleteComponent} from '../dialog/delete/delete.component';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {Album} from '../core/album.model';
import {Image} from '../core/image.model';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {albumListLoading, AppState, layoutDirection, selectAlbums} from '../reducers';
import {LoadAlbum} from '../actions/album.actions';
import {map} from 'rxjs/operators';
import {DeleteImage, ImageActionTypes} from '../actions/image.actions';
import {ChangeLayout} from '../actions/layout.actions';
import {ofType} from '@ngrx/effects';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  album: Album;
  private sub: any;
  id: number;
  query: string;
  album$: Observable<Album>;
  loading$: Observable<boolean>;
  layout$: Observable<string>;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private store: Store<AppState>,
              private actionSubject: ActionsSubject, private snackBar: MatSnackBar) {

    this.album$ = combineLatest([this.route.params, this.store.pipe(select(selectAlbums))]).pipe(
      map(([{id}, albums]) => albums.find((album: Album) => album.id === +id)),
    );
    this.layout$ = this.store.pipe(select(layoutDirection));
    this.loading$ = this.store.pipe(select(albumListLoading));

    this.actionSubject.pipe(
      ofType(ImageActionTypes.DeleteImageSuccess),
    ).subscribe(() => {
      this.snackBar.open('Slika je uspešno obrisana', null, {
        duration: 4000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
      });
    });
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
    this.store.dispatch(new ChangeLayout({direction: 'columns'}));
  }

  gridRows(): void {
    this.store.dispatch(new ChangeLayout({direction: 'rows'}));
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
