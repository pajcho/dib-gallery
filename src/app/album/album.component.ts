import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SlideshowComponent} from '../dialog/slideshow/slideshow.component';
import {DeleteComponent} from '../dialog/delete/delete.component';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {forkJoin} from 'rxjs';
import {Album} from '../core/album.model';
import {Image} from '../core/image.model';

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

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private albumService: AlbumService,
              private imageService: ImageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;

      this.albumService.get(this.id).subscribe((album) => {
        this.album = album;

        forkJoin([this.album.getImages(), this.album.getUser()]).subscribe(([images, user]) => {
          album.images = images;
          album.user = user;
        });
      });
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
        // delete the image
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
