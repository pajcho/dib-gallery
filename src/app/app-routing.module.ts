import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AlbumsComponent} from './albums/albums.component';
import {AlbumComponent} from './album/album.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: '**', redirectTo: '/albums' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
