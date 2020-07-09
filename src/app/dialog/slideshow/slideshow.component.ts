import {Component, Inject, OnInit} from '@angular/core';
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

}
