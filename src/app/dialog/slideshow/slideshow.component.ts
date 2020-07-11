import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SlideshowComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.next();
    }

    if (event.key === 'ArrowLeft') {
      this.previous();
    }
  }

  previous(): void {
    const currentIndex = this.data.images.findIndex(image => image.id === this.data.image.id);

    // We use Math.max to make sure we dont go bellow zero
    const previousIndex = Math.max(0, currentIndex - 1);

    this.data.image = this.data.images[previousIndex];
  }

  next(): void {
    const currentIndex = this.data.images.findIndex(image => image.id === this.data.image.id);

    // We use Math.min to make sure we dont go outside of the array
    const nextIndex = Math.min(this.data.images.length - 1, currentIndex + 1);

    this.data.image = this.data.images[nextIndex];
  }

}
