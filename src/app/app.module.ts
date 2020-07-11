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
import {FilterImagesPipe} from './filter-images.pipe';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AlbumEffects} from './effects/album.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlbumsComponent,
    AlbumComponent,
    SlideshowComponent,
    DeleteComponent,
    FilterImagesPipe,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AlbumEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
