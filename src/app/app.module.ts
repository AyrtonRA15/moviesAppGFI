import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './_shared/components/login/login.component';
import { NavbarComponent } from './_shared/components/navbar/navbar.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';

import { fakeBackendProvider, ErrorInterceptor } from './_helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchMovieComponent } from './home/search-movie/search-movie.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './_redux/reducers/movie.reducer';
import { MovieEffects } from './_redux/effects/movie.effects';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { clearState } from './_redux/reducers/app.reducer';
import { MovieCardComponent } from './_shared/components/movie-card/movie-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    LoginComponent,
    NavbarComponent,
    SearchMovieComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    ToastModule,
    TooltipModule,
    FieldsetModule,
    StoreModule.forRoot({
      listState: reducer
    }, { metaReducers: [clearState] }),
    EffectsModule.forRoot([
      MovieEffects
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
