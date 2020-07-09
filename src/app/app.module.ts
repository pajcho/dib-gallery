import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './login/login.component';
import {AlbumsComponent} from './albums/albums.component';
import {AlbumComponent} from './album/album.component';
import {SlideshowComponent} from './dialog/slideshow/slideshow.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteComponent} from './dialog/delete/delete.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlbumsComponent,
    AlbumComponent,
    SlideshowComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
